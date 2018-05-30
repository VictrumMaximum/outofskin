import * as React from "react";
import {connect} from "react-redux";
import AddMenu from "./AddMenu";
import TourView from "./TourView";
import axios, {AxiosResponse} from "axios";
import {TourJSON, TourWithID} from "../../../schemas/TourSchema";
import {tourDataRoute} from "../../../server/DataRouters/dataRoutes";
import {setTours} from "../redux/actions/tours";

interface TourMenuProps {
    pastTours: TourWithID[],
	upcomingTours: TourWithID[]
	setTours: (tours: TourJSON) => void
}

class TourMenu extends React.Component<TourMenuProps, {}> {
    constructor(props) {
        super(props);
        this.fetchTours = this.fetchTours.bind(this);
    }

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
                console.log("Fetched tours");
                console.log(responseData);
                this.props.setTours(responseData.data);
            }
        });
    }
    
    render() {
        // pass fetchTours to children to refresh when adding/deleting/updating tours
        return (
            <div>
                <AddMenu/>
                <hr style={{border: "1px solid black"}}/>
                <TourView tours={this.props.pastTours}/>
				<TourView tours={this.props.upcomingTours}/>
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
)(TourMenu)
