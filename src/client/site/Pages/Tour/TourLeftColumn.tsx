import * as React from "react";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
import {classNameSeparator} from "../../../util";
const styles = require("./styles.less");
const pageStyles = require("../styles.less");

interface TourLeftColumnProps {
    tours: TourWithoutID[];
}

export default class TourLeftColumn extends React.Component<TourLeftColumnProps, {}> {
    header = "Upcoming";

    render() {
        let tours:any = "Op dit moment hebben we geen tours gepland haha.";
        if (this.props.tours.length > 0) {
            tours = this.props.tours.map((tour) => {
                return <TourComponent
                    key={tour.begin.format("DD MMMM HH:mm")}
                    showButtons={true}
                    tour={tour} />
            })
        }
        return (
            <div id={styles.leftColumn} className={classNameSeparator(styles.tourColumn, pageStyles.whitePlaneBackground)}>
                <h2>{this.header}</h2>
                {tours}
            </div>
        );
    }
}
