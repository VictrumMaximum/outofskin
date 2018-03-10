import * as React from "react";
import {Tour} from "../../../schemas/TourSchema";
import TourComponent from "./TourComponent";
import {AxiosResponse} from "axios";
import {tourDataURL} from "./TourMenu";
import axios from "axios";

interface TourViewState {
    tours: {
        [id: string]: Tour
    };
}

export default class TourView extends React.Component<{}, TourViewState> {
    constructor(props) {
        super(props);
        this.state = {
        	tours: {}
        };
        this.fetchTours = this.fetchTours.bind(this);
	    this.deleteTour = this.deleteTour.bind(this);
    }

	fetchTours() {
		axios.get(tourDataURL, {params: {limit: 5}}).then((response: AxiosResponse) => {
			const responseData = response.data;
			if (responseData.error) {
				console.log(JSON.stringify(responseData.error, null, 2));
			}
			else {
				console.log("Fetched tours");
				console.log(responseData);
				this.setState({tours: responseData.data});
			}
		});
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
				const tours = this.state.tours;
				delete tours[id];
				this.setState({tours});
			}
		});
	}
    
    render() {
        return (
            <div>
	            <button onClick={this.fetchTours}>Get all</button><br/>
                {Object.keys(this.state.tours).map((id) => {
                    return (
                        <TourComponent id={id} tour={this.state.tours[id]} deleteTour={this.deleteTour}/>
                    );
                })}
            </div>
        );
    }
}
