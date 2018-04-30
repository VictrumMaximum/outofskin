import * as React from "react";

interface MarkdownInputProps {
	handleChange: (event) => void
}

export default class MarkdownInput extends React.Component<MarkdownInputProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<input onChange={this.props.handleChange}/>
		);
	}
}
