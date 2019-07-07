import * as React from "react";
import Option from "./Option";
import routes from "../../routes";

import {ReactComponent as MenuIcon} from "../../images/icons/menu.svg";
import styles from "./styles.module.scss";

interface MenuBarState {
	showMenu: boolean;
	// selected equals an option title
	selected: string;
}

export default class MenuBar extends React.Component<{}, MenuBarState> {
	hideMenuOnBlur = (event) => {
        const menuBar = document.getElementById(styles.menuBar);
        let targetElement = event.target;
		// check if selected element is part of menubar
        do {
        	// Layer_1 is something very specific. It gets the id assigned
			// by the ReactSVG module. Maybe better to change it to use
			// class instead, since part of it is user defined (react-svg
			// also assigns it a class).
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

	componentDidMount() {
		const selected = document.getElementsByClassName(styles.activeOptionLink)[0];
		this.setState({selected: selected.innerHTML});
	}

	handleSelect(optionTitle) {
		this.setState({
			selected: optionTitle
		}, () => {this.toggleDisplay()});
	}

	toggleDisplay() {
		// add event listeners if opening the menu,
		// remove event listeners when closing the menu
		if (this.state.showMenu) {
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
		const menuMaxHeight = this.state.showMenu ? "11em" : "0";
		const menuIconRotation = this.state.showMenu ? "90deg" : "0";
		const pageIndicatorOpacity = this.state.showMenu ? 0 : 1;
        return (
			<div
				id={styles.menuBar}>
				{/*<ReactSVG*/}
				{/*	path={"../images/menu.svg"}*/}
				{/*	id={styles.menuIcon}*/}
				{/*	onClick={this.toggleDisplay}*/}
				{/*	style={{transform: "rotate(" + menuIconRotation + ")"}}*/}
				{/*/>*/}
				<MenuIcon
					id={styles.menuIcon}
					onClick={this.toggleDisplay}
					style={{transform: "rotate(" + menuIconRotation + ")"}}
				/>
				<div id={styles.mobilePageIndicator}
					 style={{opacity: pageIndicatorOpacity}}
					 onClick={this.toggleDisplay}>
					{this.state.selected}
					 </div>
				<div id={styles.menuOptionsWrapper}
					 style={{maxHeight: menuMaxHeight}}>
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
