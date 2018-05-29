import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {setBio} from "../../redux/actions/bio";
import * as showdown from "showdown";
import MarkdownPreview from "../../../menu/Bio/MarkdownPreview";
import {bioDataRoute} from "../../../../server/DataRouters/dataRoutes";
import styles from "./styles.less";


interface BioProps {
	bio: string,
	setBio: (newBio: string) => void
}

class Bio extends React.Component<BioProps, {}> {
	converter;

	constructor(props) {
		super(props);
		this.converter = new showdown.Converter();
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
			this.setState({
				text: bio
			});
		});
	}

	render() {
		return (
			<div  className={styles.bio}>
				<MarkdownPreview text={this.props.bio}/>
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
