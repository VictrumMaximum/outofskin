import * as React from "react";
import {clips, live} from "../Music/videos";
import Header from "./Header";

interface TwoColumnsProps {
	leftHeader: string,
	leftContent: JSX.Element[],
	rightHeader: string,
	rightContent: JSX.Element[]
}

export default class TwoColumns extends React.Component<TwoColumnsProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className={"col-11"}>
				<div className={"row"}>
					<div className={"leftColumn col-md-5"}>
						<Header text={this.props.leftHeader}/>
						{this.props.leftContent}
					</div>
					<div className={"rightColumn offset-xl-2 offset-md-1 col-md-5"}>
						<Header text={this.props.rightHeader}/>
						{this.props.rightContent}
					</div>
				</div>
			</div>
		);
	}
}
