import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Tours} from "../../../../schemas/TourSchema";
import {setTours} from "../redux/actions/tours";
import TourColumn from "./TourColumn";
const styles = require("./styles.less");

interface TourProps {
	tours: Tours;
	setTours: (tours: Tours) => void
}

const tourDataURL = "/tourData";

class TourContainer extends React.Component<TourProps, {}> {
	constructor(props) {
		super(props);
	}


	componentDidMount() {
		if (Object.keys(this.props.tours).length === 0) {
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
				console.log("Received " + Object.keys(responseData.data).length + " tours");
				console.log(responseData.data);
				this.props.setTours(responseData.data);
			}
		});
	}

	getUpcomingTours(tours: Tours): Tours {
		// const now = moment();
		// const filtered = tours.filter((tour) => {
		// 	return (moment(tour.begin).isAfter(now));
		// });
		return tours;
	}
	getPastTours(tours: Tours): Tours {
		// const now = moment();
		// const filtered = tours.filter((tour) => {
		// 	return (moment(tour.begin).isBefore(now));
		// });
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
		setTours: (tours: Tours) => dispatch(setTours(tours))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourContainer)
