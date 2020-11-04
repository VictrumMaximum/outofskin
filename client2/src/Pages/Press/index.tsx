import * as React from "react";
import styles from "./styles.module.scss";
import {left, right} from "../../data/press";
import {classNameSeparator} from "../../util";
import Quote from "./Quote";
import QuoteSchema from "../../../../schemas/QuoteSchema";

export default class PressContainer extends React.Component<{}, {}> {
	render() {
		return (
			<div id={styles.container}>
				{this.column(left)}
				{this.column(right)}
			</div>
		);
	}

	private column(quotes: QuoteSchema[]) {
		return <div className={classNameSeparator(styles.pressColumn)}>
			{quotes.map((x, index) => {
				return (
					<Quote key={index} author={x.author} quote={x.text} link={x.link}/>
				);
			})}
		</div>
	}
}
