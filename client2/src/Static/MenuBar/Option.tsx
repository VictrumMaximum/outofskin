import * as React from "react";
import {NavLink} from "react-router-dom";

import styles from "./styles.module.scss";

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
			<div className={styles.optionDiv}>
				<h1>
					<NavLink
						to={this.props.path}
						exact={true}
						className={styles.optionLink}
						  activeClassName={styles.activeOptionLink}
						onClick={() => {
							this.props.select(this.props.title);
						}}>
						{this.props.title}
						</NavLink>
				</h1>
			</div>
        );
    }
}
