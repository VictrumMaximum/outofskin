import * as React from "react";
import TourComponent from "./TourComponent";
import {TourWithoutID} from "../../../../schemas/TourSchema";

const styles = require("./styles.less");

interface TourRightColumnProps {
    tours: TourWithoutID[];
}

export default class TourRightColumn extends React.Component<TourRightColumnProps, {}> {
    header = "Past";

    render() {
        return (
            <div className={styles.rightColumn + " " + styles.tourColumn}>
                <h3>{this.header}</h3>
                {this.props.tours.map((tour) => {
                    return <TourComponent
                        key={tour.begin.format("DD MMMM HH:mm")}
                        showTicketLink={false}
                        tour={tour} />
                })}
            </div>
        );
    }
}
