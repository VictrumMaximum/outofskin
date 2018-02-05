import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {Tour} from "./TourSchema";

interface TourListState {
	tours: Tour[]
}

export default class TourList extends React.Component<{}, TourListState> {
	constructor(props) {
		super(props);
		this.state = {
			tours: []
		};
		this.fetchTours = this.fetchTours.bind(this);
		this.deleteTour = this.deleteTour.bind(this);
	}

	fetchTours() {
		axios.get("/fetchTours").then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				alert("Error while fetching tours!");
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Fetched tours:");
				console.log(responseData.tours);
				this.setState({
					tours: responseData.tours
				});
			}
		});
	}

	deleteTour(id: number) {
		axios.get("/deleteTour", {params: {id}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				alert("Error while deleting tour!");
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Tour " + id + " deleted successfully!");
				this.fetchTours();
			}
		});
	}

	render() {
		return (
			<div>
				<button onClick={this.fetchTours}>Fetch tours</button>
				<ul>
					{this.state.tours.map((tour: Tour) => {
						return (
						<li>
							<span>{tour.event}</span>
							<span>{tour.establishment}, {tour.city}</span>
							<span>{tour.begin}</span>
							<button onClick={() => {this.deleteTour(tour.id)}}>Delete</button>
						</li>
						);
					})}
				</ul>
			</div>
		);
	}
}
