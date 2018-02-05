import * as React from "react";
import * as moment from "moment";
import axios, {AxiosResponse} from "axios";
import {Tour} from "../TourMenu/TourSchema";
import TourComponent from "./TourComponent";
const styles = require("./tourStyle.less");

interface TourState {
	tours: Tour[];
}

const tourDataURL = "/tourData";

export default class TourContainer extends React.Component<{}, TourState> {
	constructor(props) {
		super(props);
		this.state = {
			tours: []
		};
	}


	componentDidMount() {
		this.fetchTours();
	}

	fetchTours() {
		axios.get(tourDataURL, {params: {limit: 5}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log(responseData.data);
				this.setState({
					tours: responseData.data
				});
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
					{this.getUpcomingTours(this.state.tours).map((tour) => {
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
