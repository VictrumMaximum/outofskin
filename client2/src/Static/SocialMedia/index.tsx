import * as React from "react";
import Button from "./Button";
import styles from "./styles.module.scss";
const socialMedias = require("./socialMedias").default;

export default class SocialMedia extends React.Component<{}, {}> {

	render() {
		return (
			<div id={styles.socialMedia}>
				{/*<div className={"col"}>*/}
					{socialMedias.map((socialMedia) => {
						return <Button key={socialMedia.name} socialMedia={socialMedia}/>
					})}
				{/*</div>*/}
			</div>
		);
	}
}
