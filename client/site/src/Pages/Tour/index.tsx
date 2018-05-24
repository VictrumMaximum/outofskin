import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Tour, Tours} from "../../../../../schemas/TourSchema";
import {setTours} from "../../redux/actions/tours";
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

		//eventually initialize state here	
	}


	componentDidMount() {
		if (this.props.pastTours.length === 0 && this.props.upcomingTours.length === 0) {
			this.fetchTours();
		}
		document.documentElement.style.backgroundImage = this.props.background;
	}

	fetchTours() {
		axios.get(tourDataURL).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Received " + Object.keys(responseData.data).length + " tours");
				// setTours also sorts and splits. Details are in the action file for tours.
				this.props.setTours(responseData.data);
			}
		});
	}
	render() {
		return (
			<div>
				<TourColumn tours={this.props.upcomingTours} header={"Upcoming"} showTicketLink={true} sortAscending={true}/>
				<TourColumn tours={this.props.pastTours} header={"Past"} showTicketLink={false} sortAscending={false}/>
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
