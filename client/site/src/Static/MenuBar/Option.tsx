import * as React from "react";
import {Link} from "react-router-dom";

const style = require("./styles.less");

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
			<div className={style.optionDiv}>
				<h1>
					<Link to={this.props.path}
						className={style.optionLink}>
						{this.props.title}
						</Link>
				</h1>
			</div>
        );
    }
}
