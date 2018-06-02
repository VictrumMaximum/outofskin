import * as React from "react";
import Option from "./Option";
import routes from "../../routes";
const styles = require("./styles.less");
import ReactSVG from 'react-svg';
require("../../media/images/icons/menu.svg");

interface MenuBarState {
	showMenu: boolean;
}

export default class MenuBar extends React.Component<{}, MenuBarState> {
	hideMenuOnBlur = (event) => {
        const menuBar = document.getElementById(styles.menuBar);
        let targetElement = event.target;
		// check if selected element is part of menubar
        do {
            if (targetElement == menuBar || targetElement["id"] == "Layer_1") {
            	// part of menubar, do nothing
                return;
            }
            targetElement = targetElement["parentNode"];
        } while (targetElement);
        // outside menubar, set showMenu to false
		// by calling toggleDisplay (also removes event listeners)
        this.toggleDisplay();
    };

	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};
		this.toggleDisplay = this.toggleDisplay.bind(this);
	}

	toggleDisplay() {
		// add event listeners if opening the menu,
		// remove event listeners when closing the menu
		if (this.state.showMenu === true) {
            document.removeEventListener("mousedown", this.hideMenuOnBlur);
            document.removeEventListener("touchstart", this.hideMenuOnBlur);
        } else {
            document.addEventListener("mousedown", this.hideMenuOnBlur);
            document.addEventListener("touchstart", this.hideMenuOnBlur);
		}
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

    render() {
		const menuDisplayStyle = this.state.showMenu ? "block" : "none";
        return (
			<div
				id={styles.menuBar}>
				<ReactSVG
					path={"../images/menu.svg"}
					id={styles.menuIcon}
					onClick={this.toggleDisplay}
				/>
				<div id={styles.menuOptionsWrapper} style={{display: menuDisplayStyle}}>
					{Object.keys(routes).map((path) => {
						return <Option
							key={path}
							title={routes[path].title}
							path={path}
							hideMenu={this.toggleDisplay}
						/>
					})}
				</div>
			</div>
        );
    }
}
