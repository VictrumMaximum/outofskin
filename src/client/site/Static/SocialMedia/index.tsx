import * as React from "react";
const socialMedias = require("./socialMedias").default;
import Button from "./Button";
const styles = require("./styles.less");

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
