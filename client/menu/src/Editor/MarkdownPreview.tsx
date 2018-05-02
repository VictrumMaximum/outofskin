import * as React from "react";
import * as showdown from "showdown";
const converter = new showdown.Converter();

interface MarkdownPreviewProps {
	text: string;
}

export default class MarkdownPreview extends React.Component<MarkdownPreviewProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.text)}}>
			</div>
		);
	}
}
