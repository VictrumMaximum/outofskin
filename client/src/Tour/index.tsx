import * as React from "react";
import * as moment from "moment";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Tour} from "../TourMenu/TourSchema";
import TourComponent from "./TourComponent";
import {setTours} from "../redux/actions/tours";
import TourColumn from "./TourColumn";
const styles = require("./styles.less");

interface TourProps {
	tours: Tour[];
	setTours: (tours: Tour[]) => void
}

const tourDataURL = "/tourData";

class TourContainer extends React.Component<TourProps, {}> {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		if (this.props.tours.length === 0) {
			this.fetchTours();
		}
	}

	fetchTours() {
		axios.get(tourDataURL, {params: {limit: 5}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log(JSON.stringify(responseData.data, null, 2));
				this.props.setTours(responseData.data);
			}
		});
	}

	getUpcomingTours(tours: Tour[]): Tour[] {
		const now = moment();
		const filtered = tours.filter((tour) => {
			return (moment(tour.begin).isAfter(now));
		});
		return tours;
	}
	getPastTours(tours: Tour[]): Tour[] {
		const now = moment();
		const filtered = tours.filter((tour) => {
			return (moment(tour.begin).isBefore(now));
		});
		return tours;
	}

	render() {
		return (
			<div className={"offset-xl-3 offset-2 col-xl-8 col-10"}  >
				<div className={"row"}>
					<TourColumn tours={this.getUpcomingTours(this.props.tours)} header={"Upcoming"}/>
					<TourColumn tours={this.getPastTours(this.props.tours)} header={"Past"}/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		tours: state.tours
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setTours: (tours) => dispatch(setTours(tours))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourContainer)
