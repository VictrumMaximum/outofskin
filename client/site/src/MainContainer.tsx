import * as React from "react";
const styles = require("./styles.less");
require("../media/images/tour.jpg");
require("../media/images/normal_1080.jpg");
require("../media/images/cover_1080.jpg");
require("../media/images/weird_1080.jpg");
require("../media/fonts/mic-32regular.ttf");
import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import Home from "./Home";
import ContentFixator from "./Templates/ContentFixator";
import MenuBar from "./MenuBar";
import SocialMedia from "./SocialMedia";

export default class MainContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<BrowserRouter>
				{/*router may only have 1 child element*/}
				<div>
					<MenuBar />
					{/*<Route exact path={"/"} component={Home}/>*/}
					{Object.keys(routes).map(path => {
						return (
							<div key={path}>
								<Route
									key={path}
									exact path={path}
									render = {(routeProps) => {
										// react syntax requires component names to start with capital letter
										const Component = routes[path].component;
										return <ContentFixator content={<Component background={"url('./images/"+routes[path].background+"')"} {...routeProps}/>}/>
									}}/>
							</div>);
					})}
					<SocialMedia/>
				</div>
			</BrowserRouter>
		);
	}
}
