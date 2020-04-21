import * as React from "react";
import {connect} from "react-redux";
import {TourWithID} from "../../../schemas/TourSchema";
import EditMenu from "./EditMenu";
import {deleteTour, startEdit, updateTour} from "../redux/actions/tours";
import axios, {AxiosResponse} from "axios";
import {tourDataRoute} from "../../../server/DataRouters/dataRoutes";

interface TourComponentProps {
	tour: TourWithID,
	deleteTour: (id: string) => void,
	startEdit: (id: string) => void
}

class TourComponent extends React.Component<TourComponentProps, {}> {
    constructor(props) {
        super(props);
		this.deleteTour = this.deleteTour.bind(this);
    }

	deleteTour(id) {
		axios.delete(tourDataRoute, {params: {id: id}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Tour "+id+" deleted");
				this.props.deleteTour(id);
			}
		});
	}

    render() {
    	const tour = this.props.tour;
    	const id = tour.id;
    	if (tour.edit) {
    		return (
    			<EditMenu id={id} tour={tour}/>
			);
		}
        return (
        	<div>
				<table style={{marginTop: "0.5em"}}>
					<tbody>
						<tr>
							<td>{tour.eventName}</td>
						</tr>
						<tr>
							<td>{tour.begin}</td>
						</tr>
					</tbody>
				</table>
				<button onClick={() => {this.deleteTour(id)}}>delete</button>
				<button onClick={() => {this.props.startEdit(id)}}>edit</button>
			</div>
        );
    }
}

const mapStateToProps = () => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		deleteTour: (id: string) => dispatch(deleteTour(id)),
		startEdit: (id: string) => dispatch(startEdit(id))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TourComponent)
