import * as React from "react";
import {TourWithID} from "../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
import {AxiosResponse} from "axios";
import axios from "axios";
import * as moment from "moment";
import {tourDataRoute} from "../../../server/DataRouters/dataRoutes";
const styles = require("./styles.less");

interface TourViewProps {
	tours: TourWithID[]
}

export default class TourView extends React.Component<TourViewProps, {}> {

    render() {
        return (
            <div className={styles.tourViewColumn}>
                {this.props.tours.map((tour: TourWithID) => {
					return (
						<TourComponent key={tour.id} tour={tour}/>
					);
				})}
            </div>
        );
    }
}
