import * as React from "react";
import TourComponent from "./TourComponent";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import {classNameSeparator} from "../../util";
import styles from "./styles.module.scss";

interface TourRightColumnProps {
    tours: TourWithoutID[];
}

export default class TourRightColumn extends React.Component<TourRightColumnProps, {}> {
    header = "Past";

    render() {
        return (
            <div className={classNameSeparator(styles.tourColumn, "whitePlaneBackground", "col")}>
                <h2>{this.header}</h2>
                {this.props.tours.map((tour) => {
                    return <TourComponent
                        key={tour.begin.getTime()}
						showButtons={false}
                        tour={tour} />
                })}
            </div>
        );
    }
}
