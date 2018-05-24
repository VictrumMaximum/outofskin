import * as React from "react";
import {AxiosResponse} from "axios";
import axios from "axios";
import {subscribersDataRoute} from "../../../../../server/src/DataRouters/dataRoutes";

interface ContactState {
	email: string
}

export default class Contact extends React.Component<{}, ContactState> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
		this.state = {
			email: ""
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		axios.post(subscribersDataRoute, {email: this.state.email}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("success");
			}
		});
	}

	handleChange(event) {
		console.log("ahandleChange");
		this.setState({
			email: event.target.value
		});
	}

	render() {
		const breaks = [];
		for (let i = 0; i < 70; i++) {
			breaks.push((<br/>))
		}

		return (
			<div>
				<input value={this.state.email} onChange={this.handleChange}/>
				<button onClick={this.handleClick}>subscribe</button>
			</div>
		);
	}
}
