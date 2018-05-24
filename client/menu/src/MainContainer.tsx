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
		console.log(styles);
		const Component = menuOptions[this.state.selected];
		return (
			<div>
				{Object.keys(menuOptions).map((menuOption) => {
					const style = {
						display: "inline-block",
						padding: "0 0.5em 0 0.5em",
						borderLeft: "0.5px",
						borderRight: "0.5px",
						borderTop: "0",
						borderBottom: "1px",
						borderColor: "black",
						borderStyle: "solid",
						cursor: "pointer"
					};
					if (this.state.selected === menuOption) {
						style["fontWeight"] = "bold";
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
