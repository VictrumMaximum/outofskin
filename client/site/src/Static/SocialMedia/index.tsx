import * as React from "react";
const socialMedias = require("./socialMedias").default;
import ButtonRow from "./ButtonRow";
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
			<div id="socialMedia" className={"row"}>
				<div className={"col-12"}>
					{socialMedias.map((socialMedia) => {
						return <ButtonRow key={socialMedia.name} socialMedia={socialMedia}/>
					})}
				</div>
			</div>
		);
	}
}
