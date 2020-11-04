import * as React from "react";
import styles from "./styles.module.scss";
import {classNameSeparator} from "../../util";

interface ButtonProps {
	text: string;
	action: () => void;
	height: string;
}

export default class Button extends React.Component<ButtonProps, {}> {
	render() {
		return (
			<div
				className={classNameSeparator(styles.button, "col")}
				onClick={this.props.action}
				style={{paddingBottom: this.props.height, paddingTop: this.props.height}}>
				{this.props.text}</div>
		);
	}
}
