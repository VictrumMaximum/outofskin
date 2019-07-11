import * as React from "react";
import {connect} from "react-redux";
import {setQuotes} from "../../redux/actions/press";
import Quote from "../../../../schemas/QuoteSchema";
import {AxiosResponse} from "axios";
import axios from "axios";
import PressLeftColumn from "./PressLeftColumn";
import PressRightColumn from "./PressRightColumn";
import styles from "./styles.module.scss";

interface PressContainerProps {
	left: Quote[],
	right: Quote[],
	setQuotes
}

const pressDataRoute = "/pressData";

class PressContainer extends React.Component<PressContainerProps, {}> {

	componentDidMount() {
		if (this.props.left.length === 0 && this.props.right.length === 0) {
			this.fetchQuotes();
		}
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
			<div id={styles.container} className={"col"}>
				<PressLeftColumn quotes={this.props.left}/>
				<PressRightColumn quotes={this.props.right}/>
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
