import * as React from "react";
import {classNameSeparator} from "../../../util";
const styles = require("./styles.less");
const pageStyles = require("../styles.less");

interface QuoteProps {
    author: string;
    quote: string;
    link: string;
}

export default class Quote extends React.Component<QuoteProps, {}> {

    render() {
        return (
	        <div className={classNameSeparator(styles.quote, pageStyles.whitePlaneBackground)}>
		        <div>{this.props.quote}</div>
				- <strong>{this.props.author}</strong>
				<div className={styles.boxLink} onClick={() => {window.open(this.props.link)}}>Bron</div>
	        </div>
        );
    }
}
