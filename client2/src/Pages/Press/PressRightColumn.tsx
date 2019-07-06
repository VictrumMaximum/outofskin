import * as React from "react";
import QuoteSchema from "../../../../schemas/QuoteSchema";
import Quote from "./Quote";
import {classNameSeparator} from "../../util";
import styles from "./styles.module.scss";
const pageStyles = require("../styles.module.scss");

interface PressColumnProps {
	quotes: QuoteSchema[]
}

export default class PressRightColumn extends React.Component<PressColumnProps, {}> {

    render() {
        return (
            <div id={styles.pressRightColumn} className={styles.pressColumn}>
                {this.props.quotes.map((x, index) => {
                    return (
                        <Quote key={index} author={x.author} quote={x.text} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
