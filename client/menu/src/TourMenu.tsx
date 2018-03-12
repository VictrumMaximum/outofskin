import * as React from "react";
import AddMenu from "./AddMenu";
import TourView from "./TourView";
import axios, {AxiosResponse} from "axios";
import {Tour} from "../../../schemas/TourSchema";

export const tourDataURL = "/tourData";

interface TourMenuState {
    tours: {
        [id: string]: Tour
    }
}

export default class TourMenu extends React.Component<{}, TourMenuState> {
    constructor(props) {
        super(props);
        this.state = {
            tours: {}
        };
        this.fetchTours = this.fetchTours.bind(this);
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
    
    render() {
        console.log("render menu");
        console.log(Object.keys(this.state).length);
        return (
            <div>
                <AddMenu fetchTours={this.fetchTours}/>
                <TourView tours={this.state.tours} fetchTours={this.fetchTours}/>
            </div>
        );
    }
}
