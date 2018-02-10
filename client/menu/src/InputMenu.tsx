import * as React from "react";
import InputField from "./InputField"
import axios, {AxiosResponse} from "axios";
// import * as DateTime from "react-datetime";
import {tourDataURL} from "./TourMenu";

interface InputMenuState {
	eventName: "",
	eventLink: "",
	begin: Timestamp,
	city: "",
	location: "",
	locationLink: ""
}
interface Timestamp {
	day,
	month,
	year,
	hours,
	minutes
}

const premade = {
	eventName: "testName",
	eventLink: "testEventLink",
	begin: {
		day: "01",
		month: "01",
		year: "2018",
		hours: "10",
		minutes: "00"
	},
	city: "testCity",
	location: "testLocation",
	locationLink: "testLocationLink"
};


export default class InputMenu extends React.Component<{}, InputMenuState> {
    constructor(props) {
        super(props);
        this.state = {
	        eventName: "",
	        eventLink: "",
	        begin: {
		        day: "",
		        month: "",
		        year: "",
		        hours: "",
		        minutes: ""
	        },
	        city: "",
	        location: "",
	        locationLink: ""
        };
        this.updateState = this.updateState.bind(this);
        this.updateBegin = this.updateBegin.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    updateState(event) {
    	const key = event.target.id;
    	const value = event.target.value;
    	this.setState({
		    	[key]:value
	    });
    }

    updateBegin(event) {
	    const key = event.target.id;
	    const value = event.target.value;
	    this.setState({
		    begin: {
			    ...this.state.begin, ...{[key]: value}
		    }
	    });
    }

    extractDate(date) {
    	return date.year+"-"
		    +date.month+"-"
		    +date.day+"-"
		    +date.hours+"-"
		    +date.minutes;
    }

    onSubmit(tour) {
    	const data = {
		    ...tour, ...{begin: this.extractDate(tour.begin)}
	    };
	    axios.post(tourDataURL, data).then((response: AxiosResponse) => {
		    const responseData = response.data;
		    if (responseData.error) {
			    console.log(JSON.stringify(responseData.error, null, 2));
		    }
		    else {
			    console.log("success");
		    }
	    });
    }

    render() {
        return (
            <table>
	            <tr>
		            <td>Event name</td>
		            <td><input id={"eventName"} value={this.state.eventName} onChange={this.updateState} /></td>
	            </tr>
	            <tr>
		            <td>Event link</td>
		            <td><input id={"eventLink"} value={this.state.eventLink} onChange={this.updateState} /></td>
	            </tr>
	            <tr>
		            <td>Begin</td>
		            <td>
			            <input id={"day"} onChange={this.updateBegin} placeholder="dd"/>
			            <input id={"month"} placeholder="mm"/>
			            <input id={"year"}  placeholder="yyyy"/>
			            <input id={"hours"} placeholder="hh"/>
			            <input id={"minutes"} placeholder="mm"/>
		            </td>
	            </tr>
	            <tr>
		            <td>City</td>
		            <td><input id={"city"} value={this.state.city} onChange={this.updateState} /></td>
	            </tr>
	            <tr>
		            <td>Location</td>
		            <td><input id={"location"} value={this.state.location} onChange={this.updateState} /></td>
	            </tr>
	            <tr>
		            <td>Location link</td>
		            <td><input id={"locationLink"} value={this.state.locationLink} onChange={this.updateState} /></td>
	            </tr>
	            <tr>
		            <td><button onClick={() => {this.onSubmit(this.state)}}>Add</button></td>
		            <td><button onClick={() => {this.onSubmit(premade)}}>Add premade</button></td>
	            </tr>
            </table>
        );
    }
}
