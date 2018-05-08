import * as React from "react";
import {right} from "./quotes";
import Quote from "./Quote";
const styles = require("./styles.less");

export default class RightColumn extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={styles.pressColumn}>
	            {right.map((x) => {
		            return (
			            <Quote author={x.author} quote={x.quote} link={x.link}/>
		            );
	            })}
            </div>
        );
    }
}
