import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {setBio} from "../redux/actions/bio";
import MarkdownInput from "./MarkdownInput";
import MarkdownPreview from "./MarkdownPreview";

const bioURL = "/bioData";

const markupMap = {
	"italics": "*",
	"bold": "**"
};

interface EditorProps {
	bio: string,
	setBio: (newBio: string) => void
}
interface EditorState {
	text: string;
}

class Editor extends React.Component<EditorProps, EditorState> {
	constructor(props) {
		super(props);
		this.state = {
			text: props.bio
		};
		this.handleChange = this.handleChange.bind(this);
		this.addMarkup = this.addMarkup.bind(this);
	}

	componentDidMount() {
		console.log("component mounted");
		if (this.props.bio.length === 0) {
			this.fetchBio();
		}
	}

	fetchBio() {
		console.log("Fetching bio");
		axios.get(bioURL).then((response: AxiosResponse) => {
			console.log("Received bio");
			const bio = response.data.bio;
			this.props.setBio(bio);
			this.setState({
				text: bio
			});
		});
	}

	handleChange(event) {
		this.setState({
			text: event.target.value
		})
	}

	addMarkup(type, start, end) {
		const str = this.state.text.substring(start, end);
		const symbol = markupMap[type];
		const markupString = symbol + str + symbol;
		const before = this.state.text.substring(0, start);
		const after = this.state.text.substring(end, this.state.text.length);
		this.setState({
			text: before+markupString+after
		})
	}

	render() {
		return (
			<div>
				<MarkdownInput text={this.state.text}
							   handleChange={this.handleChange}
								addMarkup={this.addMarkup}/>
				<MarkdownPreview text={this.state.text}/>
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
)(Editor)
