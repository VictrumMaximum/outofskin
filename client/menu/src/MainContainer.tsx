import * as React from "react";
const styles = require("./styles.less");
import menuOptions from "./menuOptions";

interface MainContainerState {
	selected: string
}

export default class MainContainer extends React.Component<{}, MainContainerState> {
	constructor(props) {
		super(props);
		this.state = {
			selected: Object.keys(menuOptions)[0]
		};
	}

	handleClick(menuOption) {
		this.setState({
			selected: menuOption
		});
	}

	render() {
		const Component = menuOptions[this.state.selected];
		return (
			<div>
				{Object.keys(menuOptions).map((menuOption) => {
					let style = {};
					if (this.state.selected === menuOption) {
						style = {fontWeight: "bold"};
					}
					return (<div key={menuOption} style={style} className={styles.menuOption} onClick={() => {
						this.handleClick(menuOption)
					}}>{menuOption}</div>);
				})}
				<Component />
			</div>
		);
	}
}
