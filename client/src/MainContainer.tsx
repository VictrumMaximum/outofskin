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

const routes = [
	{path: "/", component: Tour},
	{path: "/bio", component: Bio},
	{path: "/outofskin", component: OutOfSkin},
	{path: "/press", component: Press},
	{path: "/contact", component: Contact},
];

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
							<div id={"content"}>
								{routes.map(route => {
									return <Route exact path={route.path} component={route.component}/>
								})}
							</div>
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
