import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {setBio} from "../../redux/actions/bio";
import {Markdown} from "react-showdown";
// import MarkdownPreview from "../../menu/Bio/MarkdownPreview";
import styles from "./styles.module.scss";


interface BioProps {
	bio: string,
	setBio: (newBio: string) => void
}

const bioDataRoute = "/bioData";

class Bio extends React.Component<BioProps, {}> {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (this.props.bio.length === 0) {
			this.fetchBio();
		}
	}

	fetchBio() {
		axios.get(bioDataRoute).then((response: AxiosResponse) => {
			const bio = response.data.data;
			this.props.setBio(bio);
		});
	}

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

const mapStateToProps = (state) => {
	return {
		bio: state.bio
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setBio: (newBio: string) => dispatch(setBio(newBio))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bio)
