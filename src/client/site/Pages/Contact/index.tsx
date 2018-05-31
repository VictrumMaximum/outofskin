import * as React from "react";
import {AxiosResponse} from "axios";
import axios from "axios";
import {subscribersDataRoute} from "../../../../server/DataRouters/dataRoutes";
import ReactSVG from 'react-svg';
const styles = require("./styles.less");

require("../../media/images/icons/phone.svg");
require("../../media/images/icons/email.svg");

interface ContactState {
	email: string;
	subscribed: boolean;
	subscribeErrorMessage: string;
}

export default class Contact extends React.Component<{}, ContactState> {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			subscribed: false,
			subscribeErrorMessage: ""
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick() {
		this.setState({subscribeErrorMessage: ""});
		axios.post(subscribersDataRoute, {email: this.state.email}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
				this.setState({subscribeErrorMessage: JSON.stringify(responseData.error, null, 2)});
			}
			else {
				console.log("success");
				this.setState({subscribed: true});
			}
		});
	}

	handleChange(event) {
		this.setState({
			email: event.target.value
		});
	}

	render() {
		let subscribeButton = <div className={styles.boxLink} onClick={this.handleClick}>subscribe</div>;
		if (this.state.subscribed) {
			subscribeButton = <span style={{color: "green"}}>Bedankt!</span>;
		}

		return (
			<div>
				<table className={styles.information}>
					<tbody>
						<tr>
							<td><ReactSVG
								path={"../images/phone.svg"}
								svgClassName={styles.icon}
							/></td>
							<td>+316 42 96 12 33</td>
						</tr>
						<tr>
							<td><ReactSVG
								path={"../images/phone.svg"}
								svgClassName={styles.icon}
							/></td>
							<td>+316 15 58 62 06</td>
						</tr>
						<tr>
							<td><ReactSVG
								path={"../images/email.svg"}
								svgClassName={styles.icon}
							/></td>
							<td>band@outofskin.com</td>
						</tr>

					</tbody>
				</table>
				<br/>
				Meld je aan voor de nieuwsbrief!<br/>
				<span style={{color: "red"}}>{this.state.subscribeErrorMessage}</span><br/>
				<input placeholder={"email"} value={this.state.email} onChange={this.handleChange}/>
				<div className={styles.boxLinkWrapper}>
					{subscribeButton}
				</div>
				<br/><br/>
			</div>
		);
	}
}
