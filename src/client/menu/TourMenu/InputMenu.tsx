import * as React from "react";
import {TourWithID} from "../../../schemas/TourSchema";
const styles = require("./styles.less");

interface InputMenuState {
    tour: TourWithID;
    beginDate: {
        year: string;
        month: string;
        day: string;
        hours: string;
        minutes: string;
    };
}

interface InputMenuProps {
	initialState: any,
	buttons: {
		onClick: (id) => void,
		text: string
	}[],
	onChange: (newState) => void;
}

export default class InputMenu extends React.Component<InputMenuProps, InputMenuState> {
    constructor(props) {
        super(props);
        this.state = {
            tour: this.props.initialState,
            beginDate: {
                year: "",
                month: "",
                day: "",
                hours: "",
                minutes: "",
            }
        };
        this.updateState = this.updateState.bind(this);
        this.updateBegin = this.updateBegin.bind(this);
    }

    updateState(event) {
    	const key = event.target.id;
    	const value = event.target.value;
    	const newTour = {...this.state.tour, [key]:value};
    	this.setState({
            tour: newTour
        });
        this.props.onChange(this.state.tour);
    }

    updateBegin(event) {
	    const key = event.target.id;
	    const value = event.target.value;
		if (value.length === 0) {
			return;
		}
        const date = this.state.beginDate;
		date[key] = value;
		const dateString = date.year+"-"+date.month+"-"+date.day+" "+date.hours+":"+date.minutes;
		const newTour = {...this.state.tour, begin: dateString};
        this.setState({
            tour: newTour,
            beginDate: date,
        });
        this.props.onChange(newTour);
    }

    render() {
        return (
        	<div className={"row"} >
				<div className={"col-4"}>
                    Event name
				</div>
                <div className={"col-12"}>
                    <input id={"eventName"} className={styles.fullWidth} value={this.state.tour.eventName} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Event link
                </div>
                <div className={"col-12"}>
                    <input id={"eventLink"} className={styles.fullWidth} value={this.state.tour.eventLink} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Begin
                </div>
                <div className={"col-12"}>
                    <input id={"day"} className={styles.twoDigitInput+" "+styles.centeredInput} onChange={this.updateBegin} placeholder="dd"/>
                    <input id={"month"} className={styles.twoDigitInput+" "+styles.centeredInput} onChange={this.updateBegin} placeholder="mm"/>
                    <input id={"year"} className={styles.fourDigitInput+" "+styles.centeredInput} onChange={this.updateBegin} placeholder="yyyy"/>
                </div>
                <div className={"col-12"}>
                    <input id={"hours"} className={styles.twoDigitInput+" "+styles.centeredInput} onChange={this.updateBegin} placeholder="hh"/>:
                    <input id={"minutes"} className={styles.twoDigitInput+" "+styles.centeredInput} onChange={this.updateBegin} placeholder="mm"/>
                </div>
                <div className={"col-4"}>
                    Location
                </div>
                <div className={"col-12"}>
                    <input id={"location"} className={styles.fullWidth} value={this.state.tour.location} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Location link
                </div>
                <div className={"col-12"}>
                    <input id={"locationLink"} className={styles.fullWidth} value={this.state.tour.locationLink} onChange={this.updateState} />
                </div>
                <div className={"col-12"}>
                    {this.props.buttons.map((button) => {
                        return (<button key={button.text} onClick={button.onClick}>{button.text}</button>);
                    })}
                </div>
			</div>
		);
    }
}

/*
<table>
                <tr>
                    <td>Event name</td>
                </tr>
                <tr>
                    <td><input id={"eventName"} value={this.state.eventName} onChange={this.updateState} /></td>
                </tr>
                <tr>
                    <td>Event link</td>
                </tr>
                <tr>
                    <td><input id={"eventLink"} value={this.state.eventLink} onChange={this.updateState} /></td>
                </tr>
                <tr>
                    <td>Begin</td>
                </tr>
                <tr>
                <td>
                <input id={"day"} value={this.state.begin.date()} onChange={this.updateBegin} placeholder="dd"/>
                </td>
                <td>
                <select id={"month"} onChange={this.updateBegin}>
                {moment.months().map((month) => {
                return (<option value={month}>{month}</option>);
                })};
                </select>
                </td>
                <td>
                <input id={"year"} value={this.state.begin.year()}  onChange={this.updateBegin} placeholder="yyyy"/>
                </td>
                </tr>
                <tr>
                    <td>
                        <input id={"hours"} value={this.state.begin.hours()} onChange={this.updateBegin} placeholder="hh"/>
                        <input id={"minutes"} value={this.state.begin.minutes()} onChange={this.updateBegin} placeholder="mm"/>
                    </td>
                </tr>
                <tr>
                    <td>City</td>
                </tr>
                <tr>
                    <td><input id={"city"} value={this.state.city} onChange={this.updateState} /></td>
                </tr>
                <tr>
                    <td>Location</td>
                </tr>
                <tr>
                    <td><input id={"location"} value={this.state.location} onChange={this.updateState} /></td>
                </tr>
                <tr>
                    <td>Location link</td>
                </tr>
                <tr>
                    <td><input id={"locationLink"} value={this.state.locationLink} onChange={this.updateState} /></td>
                </tr>
                <tr>
                    {this.props.buttons.map((button) => {
                        return (<td><button onClick={button.onClick}>{button.text}</button></td>);
                    })}
                </tr>
            </table>
*/
