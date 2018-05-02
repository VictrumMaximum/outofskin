import * as React from "react";
import {Tour} from "../../../../schemas/TourSchema";
import InputMenu from "./InputMenu";

interface EditMenuProps {
	id: string,
	tour: Tour,
	cancelEdit: () => void,
	onSubmit: (id, tour, cancelEdit: () => void) => void
}


export default class EditMenu extends React.Component<EditMenuProps, Tour> {
    constructor(props) {
        super(props);
        this.state = this.props.tour;
        this.onChange = this.onChange.bind(this);
    }

    getButtons() {
        return [
            {
                text: "save",
                onClick: () => this.props.onSubmit(this.props.id, this.state, this.props.cancelEdit)
            },
            {
                text: "cancel",
                onClick: this.props.cancelEdit
            }
        ]
    }

    onChange(newState: Tour) {
        this.setState(newState);
    }

    render() {
        return (
            <InputMenu initialState={this.props.tour} buttons={this.getButtons()} onChange={this.onChange}/>
        );
    }
}
