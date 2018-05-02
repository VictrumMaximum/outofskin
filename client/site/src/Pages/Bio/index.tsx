import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {setBio} from "../../redux/actions/bio";
import * as showdown from "showdown";
const styles = require("./styles.less");

const bioURL = "/bioData";

interface BioProps {
	bio: string,
	setBio: (newBio: string) => void
}

class Bio extends React.Component<BioProps, {}> {
	converter;

	constructor(props) {
		super(props);
		this.converter = new showdown.Converter();
		document.documentElement.style.backgroundImage = props.background;
	}

	componentDidMount() {
		if (this.props.bio.length === 0) {
			this.fetchBio();
		}
	}

	fetchBio() {
		axios.get(bioURL).then((response: AxiosResponse) => {
			const bio = response.data.bio;
			this.props.setBio(bio);
			this.setState({
				text: bio
			});
		});
	}

	render() {
		return (
			<div className={styles.bio} dangerouslySetInnerHTML={{__html: this.converter.makeHtml(this.props.bio)}}>
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
