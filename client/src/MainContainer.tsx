import * as React from "react";
import { connect } from 'react-redux';
import Static from "./Static";
import Tour from "./Tour";
import Bio from "./Bio";
import Contact from "./Contact";
import OutOfSkin from "./OutOfSkin";
import Press from "./Press";
const styles = require("./generalStyles.less");
const tourBG = require("../media/images/tour.jpg");
require("../media/images/normal_1080.jpg");
require("../media/images/cover_1080.jpg");
require("../media/images/weird_1080.jpg");
require("../media/fonts/mic-32regular.ttf");
import {Route, Redirect} from "react-router-dom";
import {Switch, BrowserRouter} from "react-router-dom";

interface MainContainerProps {
	background: string;
}

class MainContainer extends React.Component<MainContainerProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		const backgroundUrl = "url('./images/"+this.props.background+"')";

		return (
			<BrowserRouter>
				<div className={"container-fluid " + styles.background + " " + styles.defaultText} style={{backgroundImage: backgroundUrl}}>
					<div className="row justify-content-center" style={{height: "100vh"}}>
						<div className="col-12">
							<Static />
							<Route exact path="/" component={Tour}/>
							<Route exact path="/bio" component={Bio}/>
							<Route exact path="/outofskin" component={OutOfSkin}/>
							<Route exact path="/press" component={Press}/>
							<Route exact path="/contact" component={Contact}/>
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		background: state.background
	};
};

export default connect(
	mapStateToProps
)(MainContainer);
