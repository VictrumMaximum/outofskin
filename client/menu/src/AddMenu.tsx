import * as React from "react";
import axios, {AxiosResponse} from "axios";
import {tourDataURL} from "./TourMenu";
import {Moment} from "moment";
import * as moment from "moment";

interface AddMenuState {
	eventName: string,
	eventLink: string,
	begin: Moment,
	city: string,
	location: string,
	locationLink: string
}
// interface Timestamp {
// 	day,
// 	month,
// 	year,
// 	hours,
// 	minutes
// }

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


export default class AddMenu extends React.Component<{}, AddMenuState> {
    constructor(props) {
        super(props);
        this.state = {
	        eventName: "",
	        eventLink: "",
	        begin: moment(),
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
        const begin = this.state.begin;
        switch (key) {
            case "day":
                begin.day(value);
                break;
            case "month":
                begin.month(value);
                break;
            case "year":
                begin.year(value);
                break;
            case "hours":
                begin.hours(value);
                break;
            case "minutes":
                begin.minutes(value);
                break;
        }
        this.setState({
            begin
        });
    }

    onSubmit(tour) {
    	const data = {
		    ...tour, ...{begin: this.state.begin.format("YYYY-MM-DD HH:mm")}
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

    test() {
		axios.get("/test").then((response: AxiosResponse) => {
			console.log("success");
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
			            <input id={"month"} onChange={this.updateBegin} placeholder="mm"/>
			            <input id={"year"} onChange={this.updateBegin} placeholder="yyyy"/>
			            <input id={"hours"} onChange={this.updateBegin} placeholder="hh"/>
			            <input id={"minutes"} onChange={this.updateBegin} placeholder="mm"/>
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
					<td><button onClick={this.test}>test</button></td>
	            </tr>
            </table>
        );
    }
}
