import * as React from "react";

interface MarkdownInputProps {
	handleChange: (event) => void
	update: () => void,
	addMarkup: (type: string, start: number, end: number) => void
	text: string;
}

export default class MarkdownInput extends React.Component<MarkdownInputProps, {}> {
	constructor(props) {
		super(props);
		this.state = {
			selectionStart: 0,
			selectionEnd: 0
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(type) {
		const input = document.getElementById("bioInput");
		this.props.addMarkup(type, input["selectionStart"], input["selectionEnd"])
	}

	render() {
		return (
			<div>
				<textarea id={"bioInput"} style={{width: "100%", height: "20em"}} value={this.props.text} onChange={this.props.handleChange}/>
				<button onClick={() => {this.handleClick("bold")}}>B</button>
				<button onClick={() => {this.handleClick("italics")}}>I</button>
				<button onClick={this.props.update}>Update</button>
			</div>
		);
	}
}
