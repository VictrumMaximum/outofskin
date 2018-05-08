import * as React from "react";
import {left} from "./quotes";
import Quote from "./Quote";
const styles = require("./styles.less");

export default class LeftColumn extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={styles.pressColumn}>
                {left.map((x) => {
                    return (
                        <Quote author={x.author} quote={x.quote} link={x.link}/>
                    );
                })}
            </div>
        );
    }
}
