import * as React from "react";
const styles = require("./styles.css");
require("./media/images/tour.jpg");
require("./media/images/normal_1080(low).jpg");
require("./media/images/cover_1080(low).jpg");
require("./media/images/weird_1080(low).jpg");
require("./media/fonts/mic-32regular.ttf");
import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import Home from "./Pages/Home/index";
import ContentFixator from "./Pages/ContentFixator";
import MenuBar from "./Static/MenuBar/index";
import SocialMedia from "./Static/SocialMedia/index";

export default class MainContainer extends React.Component<{}, {}> {

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
										return <ContentFixator
											content={<Component {...routeProps}/>}
											background={"url('./images/"+routes[path].background+"')"}/>
									}}/>
							</div>);
					})}
					<SocialMedia/>
				</div>
			</BrowserRouter>
		);
	}
}
