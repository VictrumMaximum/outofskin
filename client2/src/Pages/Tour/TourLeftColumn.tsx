import * as React from "react";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
import {classNameSeparator} from "../../util";
import styles from "./styles.module.scss";

interface TourLeftColumnProps {
    tours: TourWithoutID[];
}

export default class TourLeftColumn extends React.Component<TourLeftColumnProps, {}> {
    header = "Upcoming";

    render() {
        let tours: any = "Op dit moment hebben we geen tours gepland.";
        if (this.props.tours.length > 0) {
            tours = this.props.tours.map((tour) => {
                return <TourComponent
                    key={tour.begin.getTime()}
                    showButtons={true}
                    tour={tour} />
            })
        }
        return (
            <div className={classNameSeparator(styles.tourColumn, "whitePlaneBackground")}>
                <h2>{this.header}</h2>
                {tours}
            </div>
        );
    }
}
