import * as React from "react";
import AddMenu from "./AddMenu";
import TourView from "./TourView";
import axios, {AxiosResponse} from "axios";
import {Tour} from "../../../../schemas/TourSchema";

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
        axios.get(tourDataURL).then((response: AxiosResponse) => {
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
        // pass fetchTours to children to refresh when adding/deleting/updating tours
        return (
            <div>
                <AddMenu fetchTours={this.fetchTours}/>
                <hr style={{border: "1px solid black"}}/>
                <TourView tours={this.state.tours} fetchTours={this.fetchTours}/>
            </div>
        );
    }
}
