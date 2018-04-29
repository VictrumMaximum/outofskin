import * as React from "react";

interface ContentFixatorProps {
	content: JSX.Element;
}

export default class ContentFixator extends React.Component<ContentFixatorProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{
				textAlign: "center",
				position: "fixed",
				top: "8em",
				left: "0",
				right: "0",
				height: "calc(100% - 8em)",// https://stackoverflow.com/questions/7357818/how-can-an-html-element-fill-out-100-of-the-remaining-screen-height-using-css fucking legend
				overflow: "auto"}}>
				{this.props.content}
			</div>
		);
	}
}
