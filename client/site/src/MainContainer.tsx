import * as React from "react";
import Static from "./Static";
const styles = require("./styles.less");
require("../media/images/tour.jpg");
require("../media/images/normal_1080.jpg");
require("../media/images/cover_1080.jpg");
require("../media/images/weird_1080.jpg");
require("../media/fonts/mic-32regular.ttf");
import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import Home from "./Home";

interface MainContainerState {
	background: string;
}

export default class MainContainer extends React.Component<{}, MainContainerState> {
	constructor(props) {
		super(props);
		this.state = {
			background: routes["/"+window.location.href.split("/")[3]].background
		};
		this.updateBackground = this.updateBackground.bind(this);
	}

	// updates background when route changes
	updateBackground() {
		const background = routes["/"+window.location.href.split("/")[3]].background;
		if (this.state.background !== background) {
			this.setState({background})
		}
	}

	render() {
		const backgroundUrl = "url('./images/"+this.state.background+"')";

		return (
			<BrowserRouter>
				{/*router may only have 1 child element*/}
				<div >
					<Static />
					{/*<Route exact path={"/"} component={Home}/>*/}
					{Object.keys(routes).map(path => {
						return (
							<div style={{position: "relative", top: "15em"}}>
								<Route
									key={path}
									exact path={path}
									render = {(routeProps) => {
										// trigger background update for every path change
										this.updateBackground();
										// react syntax requires component names to start with capital letter
										const Component = routes[path].component;
										return <Component background={"url('./images/"+routes[path].background+"')"} {...routeProps}/>
									}}/>
							</div>);
					})}
				</div>
			</BrowserRouter>
		);
	}
}
