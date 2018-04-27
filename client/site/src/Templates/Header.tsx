import * as React from "react";

interface HeaderProps {
	text: string
}

export default class Header extends React.Component<HeaderProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<h3>
				{this.props.text}
			</h3>
		);
	}
}
