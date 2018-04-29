import * as React from "react";
import TourComponent from "./TourComponent";
import {Tour} from "../../../../schemas/TourSchema";
const styles = require("./styles.less");

interface TourColumnProps {
	tours: Tour[];
	header: string;
}

export default class TourColumn extends React.Component<TourColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id={styles.upcoming} style={{display: "inline-block", paddingLeft: "2em", paddingRight: "2em", textAlign: "left"}}>
				<h3>{this.props.header}</h3>
				{this.props.tours.map((tour) => {
					return <TourComponent tour={tour} />
				})}
			</div>
		);
	}
}
