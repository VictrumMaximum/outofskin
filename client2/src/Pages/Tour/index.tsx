import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {TourJSON} from "../../../../schemas/TourSchema";
import {setTours} from "../../redux/actions/tours";
import TourLeftColumn from "./TourLeftColumn";
import TourRightColumn from "./TourRightColumn";
import styles from "./styles.module.scss";

interface TourProps {
	// tours are stored in ascending order
	pastTours: TourJSON[];
	upcomingTours: TourJSON[]
	setTours: (tours: TourJSON) => void
}

const tourDataRoute = "/tourData";

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
			<div id={styles.container}>
				<TourLeftColumn tours={this.props.upcomingTours} />
                <TourRightColumn tours={this.props.pastTours.slice().reverse()} />
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
