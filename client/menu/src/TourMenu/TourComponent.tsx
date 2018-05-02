import * as React from "react";
import {Tour} from "../../../../schemas/TourSchema";
import EditMenu from "./EditMenu";

interface TourComponentProps {
	id: string,
	tour: Tour,
	deleteTour: (id) => void,
	updateTour: (id, tour, cancelEdit: () => void) => void
}

interface TourComponentState {
	edit: boolean
}

export default class TourComponent extends React.Component<TourComponentProps, TourComponentState> {
    constructor(props) {
        super(props);
        this.state = {
        	edit: false
		};
        this.startEdit = this.startEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
    }

    cancelEdit() {
    	this.setState({edit: false});
	}

	startEdit() {
    	this.setState({edit: true});
	}

	// TODO: add confirmation/cancel buttons when deleting
    render() {
    	const tour = this.props.tour;
    	const id = this.props.id;
    	if (this.state.edit) {
    		return (
    			<EditMenu id={this.props.id} tour={this.props.tour} onSubmit={this.props.updateTour} cancelEdit={this.cancelEdit}/>
			);
		}
        return (
            <table style={{marginTop: "0.5em"}}>
				{/*<tr>*/}
					{/*<td>{id}</td>*/}
				{/*</tr>*/}
                <tr>
					<td>{tour.eventName}</td>
				</tr>
				<tr>
					<td>{tour.begin.format("DD MMMM HH:mm")}</td>
				</tr>
	            <button onClick={() => {this.props.deleteTour(id)}}>delete</button>
				<button onClick={this.startEdit}>edit</button>
            </table>
        );
    }
}
