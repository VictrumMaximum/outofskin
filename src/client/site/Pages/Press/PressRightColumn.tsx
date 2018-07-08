import * as React from "react";
import QuoteSchema from "../../../../schemas/QuoteSchema";
import Quote from "./Quote";
import {classNameSeparator} from "../../../util";
const styles = require("./styles.less");
const pageStyles = require("../styles.less");

interface PressColumnProps {
	quotes: QuoteSchema[]
}

export default class PressRightColumn extends React.Component<PressColumnProps, {}> {

    render() {
        return (
            <div id={styles.pressRightColumn} className={classNameSeparator(styles.pressColumn, pageStyles.whitePlaneBackground)}>
                {this.props.quotes.map((x) => {
                    return (
                        <Quote author={x.author} quote={x.text} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
