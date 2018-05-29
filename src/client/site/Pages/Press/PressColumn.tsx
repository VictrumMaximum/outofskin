import * as React from "react";
import QuoteSchema from "../../../../schemas/QuoteSchema";
import Quote from "./Quote";
const styles = require("./styles.less");

interface PressColumnProps {
	quotes: QuoteSchema[]
}

export default class PressColumn extends React.Component<PressColumnProps, {}> {

    render() {
        return (
            <div className={styles.pressColumn}>
                {this.props.quotes.map((x) => {
                    return (
                        <Quote author={x.author} quote={x.text} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
