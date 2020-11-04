import * as React from "react";
import styles from "./styles.module.scss";
import tours from "../../data/tours";
import {classNameSeparator} from "../../util";
import TourComponent from "./TourComponent";

const sorted = Object.keys(tours);
sorted.sort((a, b) => {
	const dateA = new Date(tours[a].begin); // TODO: DO THIS WITH STRING SPLITTING!!
	const dateB = new Date(tours[b].begin); // TODO: DO THIS WITH STRING SPLITTING!!
	return dateB.valueOf() - dateA.valueOf();
});

const now = new Date().valueOf();
const upcoming = sorted.filter((t) => new Date(tours[t].begin).valueOf() > now);
const past = sorted.filter((t) => new Date(tours[t].begin).valueOf() < now);

export default class TourContainer extends React.Component<{}, {}> {
	render() {
		return (
			<div id={styles.container}>
				{this.column(
					upcoming,
					"Upcoming",
					"Op dit moment \n hebben wij geen tours gepland staan",
				true)}
				{this.column(
					past,
					"Past",
					"",
				false)}
			</div>
		);
	}

	column(list: string[], header: string, placeHolder: string, showButtons: boolean) {
		return <div className={classNameSeparator(styles.tourColumn, "whitePlaneBackground")}>
			<h2>{header}</h2>
			{list.length === 0 && placeHolder}
			{list.map((id) => {
				const tour = tours[id];
				return <TourComponent
					key={tour.begin}
					showButtons={showButtons}
					tour={tour} />
			})}
		</div>
	}
}
