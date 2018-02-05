import * as React from "react";
import {NavLink} from "react-router-dom"

const style = require("./menuBar.less");

interface OptionProps {
    title: string;
    route: string;
}

export default class Option extends React.Component<OptionProps, {}> {
    constructor(props) {
        super(props);
    }

    onClick(route) {
		window.location.href = "/" + route;
	}
    
    render() {
        return (
            <div className={"col-2 " + style.menuOption}>
                <NavLink to={"/"+this.props.route}><h3>{this.props.title}</h3></NavLink>
            </div>
        );
    }
}
