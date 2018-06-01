import * as React from "react";
import Option from "./Option";
import routes from "../../routes";
const styles = require("./styles.less");
import ReactSVG from 'react-svg';
require("../../media/images/icons/menu.svg");

interface MenuBarState {
	toggleMenu: boolean;
}

export default class MenuBar extends React.Component<{}, MenuBarState> {
	constructor(props) {
		super(props);
		this.state = {
			toggleMenu: false
		};
	}

	toggleDisplay() {
		this.setState({
			toggleMenu: !this.state.toggleMenu
		});
	}

    render() {
		const menuDisplayStyle = "block";//this.state.toggleMenu ? "block" : "none";
        return (
			<div className={styles.menuBar}>
				<ReactSVG
					path={"../images/menu.svg"}
					svgClassName={styles.menuIcon}
					onClick={this.toggleDisplay.bind(this)}
				/>
				<div className={styles.menuOptionsWrapper} style={{display: menuDisplayStyle}}>
					{Object.keys(routes).map((path) => {
						return <Option
							key={path}
							title={routes[path].title}
							path={path}
						/>
					})}
				</div>
			</div>
        );
    }
}
