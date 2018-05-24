import * as React from "react";
import PressColumn from "./PressColumn";
import {connect} from "react-redux";
import {setQuotes} from "../../redux/actions/press";
import Quote from "../../../../../schemas/QuoteSchema";
import {pressDataRoute} from "../../../../../server/src/DataRouters/dataRoutes";
import {AxiosResponse} from "axios";
import axios from "axios";

interface PressContainerProps {
	background: string;
	left: Quote[],
	right: Quote[],
	setQuotes
}

class PressContainer extends React.Component<PressContainerProps, {}> {

	componentDidMount() {
		document.documentElement.style.backgroundImage = this.props.background;
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
				this.props.setQuotes(responseData.data.left, responseData.data.right);
			}
		});
	}

	render() {
		return (
			<div>
				<PressColumn quotes={this.props.left}/>
				<PressColumn quotes={this.props.right}/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		left: state.press.left,
		right: state.press.right
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setQuotes: (left: Quote[], right: Quote[]) => dispatch(setQuotes(left, right))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PressContainer)
