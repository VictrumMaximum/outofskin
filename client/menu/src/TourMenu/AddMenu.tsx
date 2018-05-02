import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {tourDataURL} from "./index";
import {Moment} from "moment";
import * as moment from "moment";
import InputMenu from "./InputMenu";

interface AddMenuState {
	eventName: string,
	eventLink: string,
	begin: Moment,
	city: string,
	location: string,
	locationLink: string
}

interface AddMenuProps {
    fetchTours: () => void
}

const premade = {
	eventName: "testName",
	eventLink: "testEventLink",
	begin: moment("2018-12-11 20:21"),
	city: "testCity",
	location: "testLocation",
	locationLink: "testLocationLink"
};

export default class AddMenu extends React.Component<AddMenuProps, AddMenuState> {
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
	    axios.post(tourDataURL, data).then((response: AxiosResponse) => {
		    const responseData = response.data;
		    if (responseData.error) {
			    console.log(JSON.stringify(responseData.error, null, 2));
                alert("Something went wrong, contact me");
		    }
		    else {
			    console.log("success");
                this.props.fetchTours();
		    }
	    });
    }

    onChange(newState: AddMenuState) {
    	this.setState(newState);
	}

    render() {
        return (
        	<InputMenu initialState={this.getInitialState()} buttons={this.getButtons()} onChange={this.onChange}/>
        );
    }
}
