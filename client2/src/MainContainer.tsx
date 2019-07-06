import * as React from "react";
import "./styles.less";
import "./fontStyle.css";
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
