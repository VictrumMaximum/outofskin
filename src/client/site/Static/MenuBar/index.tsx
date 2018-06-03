import * as React from "react";
import Option from "./Option";
import routes from "../../routes";
const styles = require("./styles.less");
import ReactSVG from 'react-svg';
require("../../media/images/icons/menu.svg");

interface MenuBarState {
	showMenu: boolean;
	// selected equals a option title
	selected: string;
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
			showMenu: false,
			selected: routes[Object.keys(routes)[0]].title
		};
		this.toggleDisplay = this.toggleDisplay.bind(this);
	}

	handleSelect(optionTitle) {
		this.setState({
			selected: optionTitle
		}, () => {this.toggleDisplay()});
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
							selected={routes[path].title === this.state.selected}
							select={this.handleSelect.bind(this)}
						/>
					})}
				</div>
			</div>
        );
    }
}
