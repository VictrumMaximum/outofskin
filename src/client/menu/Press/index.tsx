import * as React from "react";
import {pressDataRoute} from "../../../server/DataRouters/dataRoutes";
import {AxiosResponse} from "axios";
import axios from "axios";
import VideoColumnSchema from "../../../schemas/VideoColumnSchema";
import EditColumn from "./EditColumn";
import {connect} from "react-redux";
import Quote from "../../../schemas/QuoteSchema";

interface PressState {
	left: Quote[],
	right: Quote[],
}

export default class Press extends React.Component<{}, PressState> {
	constructor(props) {
		super(props);
		this.state = {
			left: [],
			right: []
		};
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleLeftChange = this.handleLeftChange.bind(this);
		this.handleRightChange = this.handleRightChange.bind(this);
	}

	componentDidMount() {
		this.fetchQuotes();
	}

	fetchQuotes() {
		axios.get(pressDataRoute).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log(responseData.data);
				this.setState({
					left: responseData.data.left,
					right: responseData.data.right
				});
			}
		});
	}

	handleUpdate() {
		const newMusic = {left: this.state.left, right: this.state.right};
		axios.patch(pressDataRoute, newMusic).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
				alert("Something went wrong, contact me");
			}
			else {
				console.log("success");
			}
		});
	}

	handleLeftChange(newLeft) {
		this.setState({
			left: newLeft
		})
	}

	handleRightChange(newRight) {
		this.setState({
			right: newRight
		})
	}

	render() {
		return (
			<div>
				<EditColumn
					header={"Left"}
					quotes={this.state.left}
					handleChange={this.handleLeftChange}/>
				<EditColumn
					header={"Right"}
					quotes={this.state.right}
					handleChange={this.handleRightChange}/>
				<button onClick={this.handleUpdate}>Update</button>
			</div>
		);
	}
}
