import * as React from "react";
import * as moment from "moment";
import {Moment} from "moment";
import axios, {AxiosResponse} from "axios";
import InputMoment from "input-moment";
import "../../../node_modules/input-moment/dist/input-moment.css";

interface TourMenuState {
	event: string;
	begin: Moment;
	city: string;
	establishment: string;
	tours;
}

export default class TourMenu extends React.Component<{}, TourMenuState> {
	constructor(props) {
		super(props);
		this.state = {
			event: null,
			begin: moment(),
			city: null,
			establishment: null,
			tours: null
		};
		this.handleInputChange = this.handleInputChange.bind(this);
		this.addTour = this.addTour.bind(this);
		this.updateBegin = this.updateBegin.bind(this);
	}

	handleInputChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	addTour() {
		console.log("Adding tour..");
		console.log(this.state);
		const params = (Object as any).assign({}, this.state, {
			begin: this.state.begin.format("YYYY-MM-DD hh:mm:ss")
		});
		axios.get("/addTour", {params}).then((response: AxiosResponse) => {
			const responseData = response.data;
			console.log(responseData);
			if (responseData.error) {
				alert("Error while adding tour!");
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				alert("Added tour!");
			}
			console.log(response.data);
		});
	}

	updateBegin(newMoment) {
		this.setState({
			begin: newMoment
		});
	}

	render() {
		const blockStyle = {
			display: "block"
		};
		return (
			<div>
				<div style={blockStyle}>
					<input name="event" placeholder="event" onChange={this.handleInputChange} />
				</div>
				<div style={blockStyle}>
					<input name="city" placeholder="city" onChange={this.handleInputChange} />
				</div>
				<div style={blockStyle}>
					<input name="establishment" placeholder="establishment" onChange={this.handleInputChange} />
				</div>
				<div style={blockStyle}>
					<InputMoment
						moment={this.state.begin}
						onChange={this.updateBegin}
						onSave={() => {/*do nothing*/}}
					/>
				</div>
				<button onClick={this.addTour}>Add</button>
			</div>
		);
	}
}
