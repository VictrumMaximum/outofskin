import * as React from "react";
import TourComponent from "./TourComponent";
import {TourWithoutID} from "../../../../schemas/TourSchema";
import {classNameSeparator} from "../../../util";
const pageStyles = require("../styles.less");

const styles = require("./styles.less");

interface TourRightColumnProps {
    tours: TourWithoutID[];
}

export default class TourRightColumn extends React.Component<TourRightColumnProps, {}> {
    header = "Past";

    render() {
        return (
            <div id={styles.rightColumn} className={classNameSeparator(styles.tourColumn, pageStyles.whitePlaneBackground)}>
                <h3>{this.header}</h3>
                {this.props.tours.map((tour) => {
                    return <TourComponent
                        key={tour.begin.format("DD MMMM HH:mm")}
						showButtons={false}
                        tour={tour} />
                })}
            </div>
        );
    }
}
