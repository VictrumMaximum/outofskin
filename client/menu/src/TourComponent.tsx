import * as React from "react";
import {Tour} from "../../../schemas/TourSchema";

interface TourComponentProps {
	id: string,
	tour: Tour,
	deleteTour: (id) => void
}


export default class TourComponent extends React.Component<TourComponentProps, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
    	const tour = this.props.tour;
    	const id = this.props.id;
        return (
            <div>
                {id},
	            {tour.eventName}
	            <button onClick={() => {this.props.deleteTour(id)}}>delete</button>
            </div>
        );
    }
}
