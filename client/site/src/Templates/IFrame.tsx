import * as React from "react";

interface IFrameProps {
	source: string
}

export default class IFrame extends React.Component<IFrameProps, {}> {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<div style={
				{
					position: "relative",
					paddingBottom: "56.25%",
					paddingTop: "30px",
					height: "0",
					overflow: "hidden"
				}}>
			<iframe
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%"
				}}
				height="100%"
				width="100%"
				src={this.props.source}
				frameBorder="0"
				allowFullScreen>
			</iframe>
			</div>
		);
	}
}
