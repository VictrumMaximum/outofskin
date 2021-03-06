import * as React from "react";
import {classNameSeparator} from "../../util";
import Button from "../../Static/Button";
import styles from "./styles.module.scss";

interface QuoteProps {
    author: string;
    quote: string;
    link: string;
}

export default class Quote extends React.Component<QuoteProps, {}> {

    render() {
        return (
	        <div className={classNameSeparator(styles.quote, "whitePlaneBackground")}>
				<div><i>{this.props.quote}</i></div>
				- <strong>{this.props.author}</strong>
				<div className={styles.buttonWrapper}>
					<Button text={"Bron"} action={() => {window.open(this.props.link)}} height={"0.3em"}/>
				</div>
	        </div>
        );
    }
}
