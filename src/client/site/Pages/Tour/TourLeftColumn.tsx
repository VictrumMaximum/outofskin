import * as React from "react";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
const styles = require("./styles.less");

interface TourLeftColumnProps {
    tours: TourWithoutID[];
}

export default class TourLeftColumn extends React.Component<TourLeftColumnProps, {}> {
    header = "Upcoming";

    render() {
        return (
            <div className={styles.leftColumn + " " + styles.tourColumn}>
                <h3>{this.header}</h3>
                {this.props.tours.map((tour) => {
                    return <TourComponent
                        key={tour.begin.format("DD MMMM HH:mm")}
                        showTicketLink={true}
                        tour={tour} />
                })}
            </div>
        );
    }
}
