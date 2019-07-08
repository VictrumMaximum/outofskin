import * as React from "react";
import "./styles.module.scss";
import "./fontStyle.css";
import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import MenuBar from "./Static/MenuBar/index";
import SocialMedia from "./Static/SocialMedia/index";
import styles from "./styles.module.scss";

export default class MainContainer extends React.Component<{}, {}> {
	render() {
		return (
			<BrowserRouter>
				{/*router may only have 1 child element*/}
				<div id={styles.mainContainer}>
					<MenuBar />
					<div id={styles.contentSidebar}>
						<div id={styles.content}>
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
						<SocialMedia/>
					</div>
				</div>
			</BrowserRouter>
		);
	}
}
