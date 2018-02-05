import * as React from "react";
import Option from "./Option";

const options = require("./menuOptions").default;

export default class MenuBar extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
			<div className="row justify-content-center" style={{width: "100%"}}>
				{Object.keys(options).map((option) => {
					return <Option title={options[option].title} route={options[option].route}/>
				})}
			</div>
        );
    }
}
