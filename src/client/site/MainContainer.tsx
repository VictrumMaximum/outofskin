import * as React from "react";
import "./styles.less";
import "./fontStyle.css";
require("./media/images/tour.jpg");
require("./media/images/normal_1080(low).jpg");
require("./media/images/cover_1080(low).jpg");
require("./media/images/weird_1080(low).jpg");
require("./media/fonts/mic-32regular.ttf");

require("./media/faviconit/favicon.ico");
require("./media/faviconit/favicon-16.png");
require("./media/faviconit/favicon-32.png");
require("./media/faviconit/favicon-57.png");
require("./media/faviconit/favicon-60.png");
require("./media/faviconit/favicon-64.png");
require("./media/faviconit/favicon-70.png");
require("./media/faviconit/favicon-72.png");
require("./media/faviconit/favicon-76.png");
require("./media/faviconit/favicon-96.png");
require("./media/faviconit/favicon-114.png");
require("./media/faviconit/favicon-120.png");
require("./media/faviconit/favicon-144.png");
require("./media/faviconit/favicon-150.png");
require("./media/faviconit/favicon-152.png");
require("./media/faviconit/favicon-160.png");
require("./media/faviconit/favicon-180.png");
require("./media/faviconit/favicon-192.png");
require("./media/faviconit/favicon-310.png");
require("./media/faviconit/browserconfig.xml");

import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
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
					{Object.keys(routes).map(path => {
						return (
								<Route
									key={path}
									exact path={path}
									render = {(routeProps) => {
										// react syntax requires component names to start with capital letter
										const Component = routes[path].component;
										return <ContentFixator
											content={<Component {...routeProps}/>}
											background={routes[path].background}/>
									}}/>);
					})}
					<SocialMedia/>
				</div>
			</BrowserRouter>
		);
	}
}
