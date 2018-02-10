import * as React from "react";

interface InputFieldProps {
    value: string;
    updateState: () => void
}

export default class InputField extends React.Component<InputFieldProps, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <input value={this.props.value} onChange={this.props.updateState}/>
        );
    }
}
