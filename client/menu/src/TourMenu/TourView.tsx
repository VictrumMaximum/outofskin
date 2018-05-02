import * as React from "react";
import {Tour} from "../../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
import {AxiosResponse} from "axios";
import {tourDataURL} from "./";
import axios from "axios";
import * as moment from "moment";

interface TourViewProps {
	tours: {
		[id: string]: Tour
    },
	fetchTours: () => void
}

export default class TourView extends React.Component<TourViewProps, {}> {
    constructor(props) {
        super(props);
	    this.deleteTour = this.deleteTour.bind(this);
        this.updateTour = this.updateTour.bind(this);
    }

    componentDidMount() {
        this.props.fetchTours();
    }

	deleteTour(id) {
    	console.log("delete tour id " + id);
		axios.delete(tourDataURL, {params: {id: id}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Tour "+id+" deleted");
				this.props.fetchTours();
			}
		});
	}

    updateTour(id, tour, cancelEdit) {
        const data = {
            ...tour, ...{begin: tour.begin.format("YYYY-MM-DD HH:mm")}
        };
        axios.patch(tourDataURL, {id: id, updates: data}).then((response: AxiosResponse) => {
            const responseData = response.data;
            if (responseData.error) {
                console.log(JSON.stringify(responseData.error, null, 2));
                alert("Something went wrong, contact me");
            }
            else {
                console.log("success");
                cancelEdit();
                this.props.fetchTours();
            }
        });
    }
    
    render() {
    	let content = [];
    	if (this.props.tours) {
            console.log(Object.keys(this.props.tours).length);
    		content = Object.keys(this.props.tours).map((id) => {
                const tour = this.props.tours[id];
                tour.begin = moment(tour.begin);
                return (
                    <TourComponent key={id} id={id} tour={tour} updateTour={this.updateTour} deleteTour={this.deleteTour}/>
                );
            })
		}
        return (
            <div style={{overflow: "auto", maxHeight: "100vh"}}>
                {content}
            </div>
        );
    }
}
