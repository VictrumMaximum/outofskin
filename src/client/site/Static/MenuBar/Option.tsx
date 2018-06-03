import * as React from "react";
import {Link} from "react-router-dom";

const style = require("./styles.less");

interface OptionProps {
    title: string;
    path: string;
    hideMenu: () => void;
    select: (route: string) => void;
    selected: boolean;
}

export default class Option extends React.Component<OptionProps, {}> {

    render() {
        return (
			<div className={style.optionDiv}>
				<h1>
					<Link to={this.props.path}
						className={style.optionLink}
						onClick={() => {
							this.props.select(this.props.title);
						}}>
						{this.props.title}
						</Link>
				</h1>
			</div>
        );
    }
}
