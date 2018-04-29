import * as React from "react";
const socialMedias = require("./socialMedias").default;
import Button from "./Button";
const styles = require("./styles.less");
require("./icons/facebook.png");
require("./icons/youtube.png");
require("./icons/instagram.png");

export default class SocialMedia extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id="socialMedia" style={{position: "fixed", right: "1em", top: "10em"}}>
				{socialMedias.map((socialMedia) => {
					return <Button key={socialMedia.name} socialMedia={socialMedia}/>
				})}
			</div>
		);
	}
}
