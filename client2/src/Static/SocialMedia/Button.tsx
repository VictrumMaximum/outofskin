import * as React from "react";

import styles from "./styles.module.scss";

interface ButtonProps {
	socialMedia: {
		name: string;
		image: any; // react component
		link: string;
	}
}

export default class Button extends React.Component<ButtonProps, {}> {

	render() {
		const Icon = this.props.socialMedia.image;
		return (
			<div className={styles.socialMediaButtonImageWrapper}>
				<Icon
					className={styles.socialButtonImage}
					onClick={() => {window.open(this.props.socialMedia.link)}}
				/>
			</div>
		);
	}
}
