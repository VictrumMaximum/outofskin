import * as React from "react";
import * as moment from "moment";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Tour} from "../TourMenu/TourSchema";
import TourComponent from "./TourComponent";
import {setTours} from "../redux/actions/tours";
const styles = require("./tourStyle.less");

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
				console.log(responseData.data);
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
	// getPastTours(tours: Tour[]): Tour[] {
	// 	const now = moment();
	// 	const filtered = tours.filter((tour) => {
	// 		return (moment(tour.begin).isBefore(now));
	// 	});
	// 	return this.sortToursByEarliestFirst(filtered);
	// }

	render() {
		return (
			<div className={"row"}>
				TourContainer
				<div id={styles.upcoming} className={"col-4 "}>
					{this.getUpcomingTours(this.props.tours).map((tour) => {
						return <TourComponent tour={tour} />
					})}
				</div>
				{/*<div id={styles.past} className={"col-4 "}>*/}
					{/*{this.getPastTours(this.state.tours).map((tour) => {*/}
						{/*return <TourComponent tour={tour} />*/}
					{/*})}*/}
				{/*</div>*/}
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
