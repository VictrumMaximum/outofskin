import * as React from "react";
import {TourJSON} from "../../../../schemas/TourSchema";
import TourLeftColumn from "./TourLeftColumn";
import TourRightColumn from "./TourRightColumn";
import styles from "./styles.module.scss";

export default class TourContainer extends React.Component<{}, {}> {
	pastTours: TourJSON[] = [];
	upcomingTours: TourJSON[] = [];

	render() {
		return (
			<div id={styles.container}>
				<TourLeftColumn tours={this.upcomingTours} />
                <TourRightColumn tours={this.pastTours} />
			</div>
		);
	}
}
