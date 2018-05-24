import * as React from "react";
import axios, {AxiosResponse} from "axios";

export const subscribersDataURL = "/subscribersData";

interface SubscribersState {
	subscribers: string[]
}

export default class Subscribers extends React.Component<{}, SubscribersState> {

	constructor(props) {
		super(props);
		this.state = {
			subscribers: []
		};
		this.fetchSubscribers = this.fetchSubscribers.bind(this);
	}

	componentDidMount() {
		this.fetchSubscribers();
	}

	fetchSubscribers() {
		axios.get(subscribersDataURL).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Fetched subscribers");
				console.log(responseData);
				this.setState({subscribers: Object.keys(responseData.data)});
			}
		});
	}

	render() {
		return (
			<div>
			{this.state.subscribers.map((subscriber) => {
				return (<span>{subscriber}<br/></span>)
			})}
			</div>
		);
	}
}
