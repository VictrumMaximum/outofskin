import * as React from "react";
import {Route, BrowserRouter, Redirect} from "react-router-dom";
import {routes, homepage} from "./routes";
import MenuBar from "./Static/MenuBar/index";
import SocialMedia from "./Static/SocialMedia/index";
import "./global.scss";
import styles from "./styles.module.scss";

export default class MainContainer extends React.Component<{}, {}> {
	render() {
		return (
			<BrowserRouter>
				{/*router may only have 1 child element*/}
				<div id={styles.mainContainer} className={"col"}>
					<MenuBar />
					<div id={styles.contentSidebar}>
						<SocialMedia/>
						<div id={styles.content} className={"row grow"}>
							<Redirect from={"/"} to={homepage} />
							{Object.keys(routes).map(path =>
								(<Route
									key={path}
									exact path={path}
									render={() => {
										const Component = routes[path].component;
										return (
										<>
											<div
												id={styles.background}
												style={{backgroundImage: `url(${routes[path].background}`}} />
											<Component />
										</>);
									}}
								/>))}
						</div>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}
