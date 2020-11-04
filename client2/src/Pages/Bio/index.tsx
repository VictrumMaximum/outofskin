import * as React from "react";
import {Markdown} from "react-showdown";
// import MarkdownPreview from "../../menu/Bio/MarkdownPreview";
import styles from "./styles.module.scss";


interface BioProps {
	bio: string,
	setBio: (newBio: string) => void
}

export default class Bio extends React.Component<BioProps, {}> {
	render() {
		return (
			<div id={styles.bio}>
				<div className={"whitePlaneBackground"}>
					<Markdown markup={this.props.bio} />
				</div>
			</div>
		);
	}
}
