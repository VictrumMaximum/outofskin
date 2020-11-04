import * as React from "react";
import PressLeftColumn from "./PressLeftColumn";
import PressRightColumn from "./PressRightColumn";
import styles from "./styles.module.scss";

export default class PressContainer extends React.Component<{}, {}> {
	left = [];
	right = [];

	render() {
		return (
			<div id={styles.container}>
				<PressLeftColumn quotes={this.left}/>
				<PressRightColumn quotes={this.right}/>
			</div>
		);
	}
}
