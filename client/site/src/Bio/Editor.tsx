import * as React from "react";
import MarkdownInput from "./MarkdownInput";
import MarkdownPreview from "./MarkdownPreview";


interface EditorState {
	text: string;
}

export default class Editor extends React.Component<{}, EditorState> {
	constructor(props) {
		super(props);
		this.state = {
			text: ""
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({
			text: event.target.value
		})
	}

	render() {
		return (
			<div>
				<MarkdownInput handleChange={this.handleChange}/>
				<MarkdownPreview text={this.state.text}/>
			</div>
		);
	}
}
