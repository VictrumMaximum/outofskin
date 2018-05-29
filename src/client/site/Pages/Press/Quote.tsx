import * as React from "react";
import styles from "./styles.less";

interface QuoteProps {
    author: string;
    quote: string;
    link: string;
}

export default class Quote extends React.Component<QuoteProps, {}> {

    render() {
        return (
	        <div className={styles.quote}>
		        <div>{this.props.quote}</div>
				- <strong>{this.props.author}</strong>
				<div className={styles.boxLink} onClick={() => {window.open(this.props.link)}}>Bron</div>
	        </div>
        );
    }
}
