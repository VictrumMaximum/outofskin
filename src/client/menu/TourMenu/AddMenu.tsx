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
    addTour: (tour: TourWithoutID) => void
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
			},
			{
				text: "Add premade",
				onClick: () => this.onSubmit(premade)
			}
		]
    }

    onSubmit(tour) {
    	const data = {
		    ...tour, ...{begin: this.state.begin.format("YYYY-MM-DD HH:mm")}
	    };
	    axios.post(tourDataRoute, data).then((response: AxiosResponse) => {
		    const responseData = response.data;
		    if (responseData.error) {
			    console.log(JSON.stringify(responseData.error, null, 2));
                alert("Something went wrong, contact me");
		    }
		    else {
			    console.log("success");
                this.props.addTour(tour);
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
		addTour: (tour: TourWithoutID) => dispatch(addTour(tour))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AddMenu)
