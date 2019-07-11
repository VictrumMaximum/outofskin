import * as React from "react";
import QuoteSchema from "../../../../schemas/QuoteSchema";
import Quote from "./Quote";
import styles from "./styles.module.scss";
import {classNameSeparator} from "../../util";

interface PressColumnProps {
	quotes: QuoteSchema[]
}

export default class PressRightColumn extends React.Component<PressColumnProps, {}> {

    render() {
        return (
            <div className={classNameSeparator(styles.pressColumn, "col")}>
                {this.props.quotes.map((x, index) => {
                    return (
                        <Quote key={index} author={x.author} quote={x.text} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
