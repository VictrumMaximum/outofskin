import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {TourJSON, TourWithoutID} from "../../../../schemas/TourSchema";
import {setTours} from "../../redux/actions/tours";
import TourColumn from "./TourColumn";
import {tourDataRoute} from "../../../../server/DataRouters/dataRoutes";
const styles = require("./styles.less");

interface TourProps {
	pastTours: TourWithoutID[];
	upcomingTours: TourWithoutID[]
	setTours: (tours: TourJSON) => void
}

class TourContainer extends React.Component<TourProps, {}> {

	componentDidMount() {
		if (this.props.pastTours.length === 0 && this.props.upcomingTours.length === 0) {
			this.fetchTours();
		}
	}

	fetchTours() {
		axios.get(tourDataRoute).then((response: AxiosResponse) => {
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
		setTours: (tours: TourJSON) => dispatch(setTours(tours))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourContainer)
