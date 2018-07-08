import * as React from "react";
import QuoteSchema from "../../../../schemas/QuoteSchema";
import Quote from "./Quote";
import {classNameSeparator} from "../../../util";
const styles = require("./styles.less");
const pageStyles = require("../styles.less");

interface PressColumnProps {
	quotes: QuoteSchema[]
}

export default class PressLeftColumn extends React.Component<PressColumnProps, {}> {

    render() {
        return (
            <div id={styles.pressLeftColumn} className={classNameSeparator(styles.pressColumn, pageStyles.whitePlaneBackground)}>
                {this.props.quotes.map((x, index) => {
                    return (
                        <Quote key={index} author={x.author} quote={x.text} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
