import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {Moment} from "moment";
import * as moment from "moment";
import InputMenu from "./InputMenu";
import {tourDataRoute} from "../../../server/DataRouters/dataRoutes";
import {TourWithoutID} from "../../../schemas/TourSchema";
import {addTour} from "../redux/actions/tours";

interface AddMenuProps {
    addTour: (id: string, tour: TourWithoutID) => void
}

const premade = {
	eventName: "testName",
	eventLink: "testEventLink",
	begin: moment("2018-12-11 20:21"),
	city: "testCity",
	location: "testLocation",
	locationLink: "testLocationLink"
};

class AddMenu extends React.Component<AddMenuProps, TourWithoutID> {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    getInitialState() {
    	return {
            eventName: "",
            eventLink: "",
            begin: moment(),
            city: "",
            location: "",
            locationLink: ""
        };
    }

    getButtons() {
    	return [
			{
				text: "Add",
				onClick: () => this.onSubmit(this.state)
			}
		]
    }

    onSubmit(tour) {
    	const data = {
		    ...tour, ...{begin: tour.begin.format("YYYY-MM-DD HH:mm")}
	    };
    	console.log(tour);
    	console.log(data);
	    axios.post(tourDataRoute, data).then((response: AxiosResponse) => {
		    const responseData = response.data;
		    if (responseData.error) {
			    console.log(JSON.stringify(responseData.error, null, 2));
                alert("Something went wrong, contact me");
		    }
		    else {
			    const id = responseData.data;
                this.props.addTour(id, tour);
		    }
	    });
    }

    onChange(newState: TourWithoutID) {
    	this.setState(newState);
	}

    render() {
        return (
        	<InputMenu initialState={this.getInitialState()} buttons={this.getButtons()} onChange={this.onChange}/>
        );
    }
}

const mapStateToProps = (state) => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		addTour: (id: string, tour: TourWithoutID) => dispatch(addTour(id, tour))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddMenu)
