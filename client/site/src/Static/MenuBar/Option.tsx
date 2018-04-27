import * as React from "react";
import {Link} from "react-router-dom";

const style = require("./menuBar.less");

interface OptionProps {
    title: string;
    path: string;
}

export default class Option extends React.Component<OptionProps, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
			<div className={"col-2 " + style.optionDiv}>
				<h3>
					<Link to={this.props.path}
						className={style.optionLink}>
						{this.props.title}
						</Link>
				</h3>
			</div>
        );
    }
}
