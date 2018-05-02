import * as React from "react";
import * as showdown from "showdown";

interface MarkdownPreviewProps {
	text: string;
}

export default class MarkdownPreview extends React.Component<MarkdownPreviewProps, {}> {
	converter;

	constructor(props) {
		super(props);
		this.converter = new showdown.Converter();
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: this.converter.makeHtml(this.props.text)}}>
			</div>
		);
	}
}
