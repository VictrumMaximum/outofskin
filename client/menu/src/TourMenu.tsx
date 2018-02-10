import * as React from "react";
import InputMenu from "./InputMenu";
import TourView from "./TourView";

export const tourDataURL = "/tourData";

export default class TourMenu extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <InputMenu />
                <TourView />
            </div>
        );
    }
}
