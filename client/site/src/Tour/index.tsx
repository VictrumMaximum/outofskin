import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Tour, Tours} from "../../../../schemas/TourSchema";
import {setTours} from "../redux/actions/tours";
import TourColumn from "./TourColumn";
const styles = require("./styles.less");

interface TourProps {
	background: string;
	pastTours: Tour[];
	upcomingTours: Tour[]
	setTours: (tours: Tours) => void
}

const tourDataURL = "/tourData";

class TourContainer extends React.Component<TourProps, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}


	componentDidMount() {
		if (this.props.pastTours.length === 0 && this.props.upcomingTours.length === 0) {
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
				// setTours also sorts and splits. Details are in the action file for tours.
				this.props.setTours(responseData.data);
			}
		});
	}
	render() {
		return (
			<div>
				<TourColumn tours={this.props.upcomingTours} header={"Upcoming"}/>
				<TourColumn tours={this.props.pastTours} header={"Past"}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pastTours: state.tours.past,
		upcomingTours: state.tours.upcoming
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
