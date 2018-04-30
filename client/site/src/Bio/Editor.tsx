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
		this.updateBio = this.updateBio.bind(this);
	}

	componentDidMount() {
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

	updateBio() {
		console.log("Updating bio");
		axios.patch(bioURL, {newBio: this.state.text}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
				alert("Something went wrong, contact me");
			}
			else {
				console.log("success");
				this.props.setBio(this.state.text);
			}
		});
	}

	handleChange(event) {
		this.setState({
			text: event.target.value
		})
	}

	addMarkup(type, start, end) {
		let str = this.state.text.substring(start, end);
		console.log(str[str.length - 1] == " ");
		console.log(str[str.length - 1]);
		// let s = start;
		// let e = end;
		while (str[str.length - 1] === " ") {
			end = end - 1;
			str = this.state.text.substring(start, end);
		}
		while (str[0] === " ") {
			start = start + 1;
			str = this.state.text.substring(start, end);
		}
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
								addMarkup={this.addMarkup}
								update={this.updateBio}/>
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
