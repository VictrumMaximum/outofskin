import * as React from "react";
import * as moment from "moment";
import {Moment} from "moment";
const styles = require("./inputMenu.less");

interface InputMenuState {
	eventName: string,
	eventLink: string,
	begin: Moment,
	city: string,
	location: string,
	locationLink: string
}

interface InputMenuProps {
	initialState: InputMenuState,
	buttons: {
		onClick: () => void,
		text: string
	}[],
	onChange: (newState) => void
}

export default class InputMenu extends React.Component<InputMenuProps, InputMenuState> {
    constructor(props) {
        super(props);
        this.state = this.props.initialState;
        this.updateState = this.updateState.bind(this);
        this.updateBegin = this.updateBegin.bind(this);
    }

    updateState(event) {
    	const key = event.target.id;
    	const value = event.target.value;
    	this.setState({
		    	[key]:value
	    }, () => {
    		this.props.onChange(this.state);
		});
    }

    updateBegin(event) {
	    const key = event.target.id;
	    const value = event.target.value;
        const begin = this.state.begin;
        switch (key) {
            case "day":
                begin.date(value);
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
        }, () => {
            this.props.onChange(this.state);
        });
    }

    render() {
        return (
        	<div className={"row"} >
				<div className={"col-4"}>
                    Event name
				</div>
                <div className={"col-12"}>
                    <input id={"eventName"} className={styles.fullWidth} value={this.state.eventName} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Event link
                </div>
                <div className={"col-12"}>
                    <input id={"eventLink"} className={styles.fullWidth} value={this.state.eventLink} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Begin
                </div>
                <div className={"col-12"}>
                    <input id={"day"} className={styles.twoDigitInput+" "+styles.centeredInput} value={this.state.begin.date()} onChange={this.updateBegin} placeholder="dd"/>
                    <select id={"month"} className={styles.monthSelect} onChange={this.updateBegin}>
                        {moment.months().map((month) => {
                            return (<option value={month}>{month}</option>);
                        })};
                    </select>
                    <input id={"year"} className={styles.fourDigitInput+" "+styles.centeredInput} value={this.state.begin.year()}  onChange={this.updateBegin} placeholder="yyyy"/>
                </div>
                <div className={"col-12"}>
                    <input id={"hours"} className={styles.twoDigitInput+" "+styles.centeredInput} value={this.state.begin.hours()} onChange={this.updateBegin} placeholder="hh"/>:
                    <input id={"minutes"} className={styles.twoDigitInput+" "+styles.centeredInput} value={this.state.begin.minutes()} onChange={this.updateBegin} placeholder="mm"/>
                </div>
                <div className={"col-4"}>
                    Location
                </div>
                <div className={"col-12"}>
                    <input id={"location"} className={styles.fullWidth} value={this.state.location} onChange={this.updateState} />
                </div>
                <div className={"col-4"}>
                    Location link
                </div>
                <div className={"col-12"}>
                    <input id={"locationLink"} className={styles.fullWidth} value={this.state.locationLink} onChange={this.updateState} />
                </div>
                <div className={"col-12"}>
                    {this.props.buttons.map((button) => {
                        return (<td><button onClick={button.onClick}>{button.text}</button></td>);
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
