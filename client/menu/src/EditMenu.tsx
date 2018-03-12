import * as React from "react";
import * as moment from "moment";
import {Moment} from "moment";
import axios, {AxiosResponse} from "axios";
import {tourDataURL} from "./TourMenu";
import {Tour} from "../../../schemas/TourSchema";

interface EditMenuState {
	eventName: string,
	eventLink: string,
	begin: Moment,
	city: string,
	location: string,
	locationLink: string
}

interface EditMenuProps {
	tour: Tour,
	cancelEdit: () => void
}


export default class EditMenu extends React.Component<EditMenuProps, EditMenuState> {
    constructor(props) {
        super(props);
        const tour = this.props.tour;
        this.state = {
        	eventName: tour.eventName,
			eventLink: tour.eventLink,
			begin: moment(tour.begin),
			city: tour.city,
			location: tour.location,
			locationLink: tour.locationLink
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
		    ...tour, ...{begin: tour.begin.format("YYYY-MM-DD HH:mm")}
	    };
    	console.log(data);
    	console.log("not sent");
	    // axios.post(tourDataURL, data).then((response: AxiosResponse) => {
		 //    const responseData = response.data;
		 //    if (responseData.error) {
			//     console.log(JSON.stringify(responseData.error, null, 2));
		 //    }
		 //    else {
			//     console.log("success");
		 //    }
	    // });
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
			            <input id={"day"} value={this.state.begin.day()} onChange={this.updateBegin} placeholder="dd"/>
			            <input id={"month"} value={this.state.begin.month()} onChange={this.updateBegin} placeholder="mm"/>
			            <input id={"year"} value={this.state.begin.year()}  onChange={this.updateBegin} placeholder="yyyy"/>
			            <input id={"hours"} value={this.state.begin.hours()} onChange={this.updateBegin} placeholder="hh"/>
			            <input id={"minutes"} value={this.state.begin.minutes()} onChange={this.updateBegin} placeholder="mm"/>
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
		            <td><button onClick={this.props.cancelEdit}>cancel</button></td>
	            </tr>
            </table>
        );
    }
}
