import * as React from "react";
const styles = require("./generalStyles.less");
import {HashRouter} from "react-router-dom";
require("../media/images/tour.jpg");
require("../media/fonts/mic-32regular.ttf");
import {Route} from "react-router-dom";
import Tour from "./Tour";
import Bio from "./Bio";
import OutOfSkin from "./OutOfSkin";
import Press from "./Press";
import Contact from "./Contact";
import Static from "./Static/index";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<HashRouter>
				<div className={"container-fluid " + styles.background + " " + styles.defaultText} style={{backgroundImage: "url(./images/tour.jpg)"}}>
					<div className="row justify-content-center" style={{height: "100vh", backgroundImage: ""}}>
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
			</HashRouter>
		);
	}
}
