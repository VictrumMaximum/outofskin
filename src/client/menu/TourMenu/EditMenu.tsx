import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {TourWithID} from "../../../schemas/TourSchema";
import InputMenu from "./InputMenu";
import {stopEdit, updateTour} from "../redux/actions/tours";
import {tourDataRoute} from "../../../server/DataRouters/dataRoutes";

interface EditMenuProps {
	tour: TourWithID,
	stopEdit: (id: string) => void,
	updateTour: (newTour: TourWithID) => void
}

class EditMenu extends React.Component<EditMenuProps, TourWithID> {
    constructor(props) {
        super(props);
        this.state = this.props.tour;
        this.onChange = this.onChange.bind(this);
    }

	updateTour(tour: TourWithID) {
		const data = {
			...tour, ...{begin: tour.begin}
		};
		axios.patch(tourDataRoute, {id: tour.id, updates: data}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
				alert("Something went wrong, contact me");
			}
			else {
				console.log("success");
				this.props.updateTour(tour);
			}
		});
	}

    getButtons() {
        return [
            {
                text: "save",
                onClick: () => this.updateTour(this.state)
            },
            {
                text: "cancel",
                onClick: () => {this.props.stopEdit(this.props.tour.id)}
            }
        ]
    }

    onChange(newState: TourWithID) {
        this.setState(newState);
    }

    render() {
        return (
            <InputMenu initialState={this.props.tour} buttons={this.getButtons()} onChange={this.onChange}/>
        );
    }
}

const mapStateToProps = (state) => {
	return {}
};

const mapDispatchToProps = (dispatch) => {
	return {
		stopEdit: (id: string) => dispatch(stopEdit(id)),
		updateTour: (tour: TourWithID) => dispatch(updateTour(tour))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditMenu)
