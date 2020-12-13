import * as React from "react";
import styles from "./styles.module.scss";
import tours from "../../data/tours";
import {classNameSeparator} from "../../util";
import TourComponent from "./TourComponent";

const getDateObject = (dateString: string): Date => {
	const [date, time] = dateString.split(" ");
	const [year, month, day] = date.split("-");
	const [hour, minute] = time.split(":");
	return new Date(
		parseInt(year),
		parseInt(month) - 1,
		parseInt(day),
		parseInt(hour),
		parseInt(minute),
		0);
};

const sorted = Object.keys(tours);
sorted.sort((a, b) => {
	const dateA = getDateObject(tours[a].begin);
	const dateB = getDateObject(tours[b].begin);
	return dateB.valueOf() - dateA.valueOf();
});

const now = new Date().valueOf();
const upcoming = sorted.filter((t) => getDateObject(tours[t].begin).valueOf() > now);
const past = sorted.filter((t) => getDateObject(tours[t].begin).valueOf() < now);

export default class TourContainer extends React.Component<{}, {}> {
	// TODO: Zet showButtons weer op true voor upcoming tours, wanneer dit weer van toepassing is
	// (en fix dan gelijk de css, het ziet er nu niet uit met die buttons)
	render() {
		return (
			<div id={styles.container}>
				{this.column(
					upcoming,
					"Upcoming",
					"Op dit moment \n hebben wij geen tours gepland staan",
				false)}
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
