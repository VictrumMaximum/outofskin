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
			<div style={{textAlign: "center", position: "fixed", top: "8em", left: "0", right: "0", height: "85%", overflow: "auto"}}>
				{this.props.content}
			</div>
		);
	}
}
