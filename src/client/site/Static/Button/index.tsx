import * as React from "react";
const styles = require("./styles.less");

interface ButtonProps {
	text: string;
	action: () => void;
	height: string;
}

export default class Button extends React.Component<ButtonProps, {}> {
	render() {
		return (
			<div
				className={styles.button}
				onClick={this.props.action}
				style={{paddingBottom: this.props.height, paddingTop: this.props.height}}>
				{this.props.text}</div>
		);
	}
}
