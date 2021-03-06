import * as React from "react";
import {AxiosResponse} from "axios";
import axios from "axios";

import Button from "../../Static/Button";
import {ReactComponent as PhoneIcon} from "../../images/icons/phone.svg";
import {ReactComponent as EmailIcon} from "../../images/icons/email.svg";
import {ReactComponent as DropboxIcon} from "../../images/icons/dropbox.svg";

import styles from "./styles.module.scss";

const subscribersDataRoute = "/subscribersData";

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
		let subscribeButton = <Button text={"subscribe"} action={this.handleClick} height={"0.3em"}/>;
		if (this.state.subscribed) {
			subscribeButton = <span style={{color: "green"}}>Bedankt!</span>;
		}

		return (
			<div id={styles.informationWrapper} className={"whitePlaneBackground col"}>
				<table className={styles.information}>
					<tbody>
						<tr>
							<td>
								<PhoneIcon className={styles.icon}/>
							</td>
							<td>+316 42 96 12 33</td>
						</tr>
						<tr>
							<td>
								<PhoneIcon className={styles.icon}/>
							</td>
							<td>+316 15 58 62 06</td>
						</tr>
						<tr>
							<td>
								<EmailIcon className={styles.icon}/>
							</td>
							<td>band@outofskin.com</td>
						</tr>
						<tr>
							<td>
								<DropboxIcon className={styles.icon}/>
							</td>
							<td>
								<a href={"https://www.dropbox.com/sh/wgen8pi81nojwdb/AAABu1ZapzS2w_BiJ4WEuHfFa?dl=0"}
									target={"blank"}
									className={styles.blackToWhiteLink}>
									Press-kit
								</a>
							</td>
						</tr>
					</tbody>
				</table>
				Meld je aan voor de nieuwsbrief!
				<span style={{color: "red"}}>{this.state.subscribeErrorMessage}</span>
				<input
					id={styles.emailInput}
					placeholder={"email"}
					value={this.state.email}
					onChange={this.handleChange}/>
				<div className={styles.boxLinkWrapper}>
					{subscribeButton}
				</div>
			</div>
		);
	}
}
