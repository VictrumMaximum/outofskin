import * as React from "react";
const socialMedias = require("./socialMedias").default;
import Button from "./Button";
import styles from "./styles.less";
require("./icons/facebook.png");
require("./icons/youtube.png");
require("./icons/instagram.png");

export default class SocialMedia extends React.Component<{}, {}> {

	render() {
		return (
			<div id={styles.socialMedia}>
				{socialMedias.map((socialMedia) => {
					return <Button key={socialMedia.name} socialMedia={socialMedia}/>
				})}
			</div>
		);
	}
}
