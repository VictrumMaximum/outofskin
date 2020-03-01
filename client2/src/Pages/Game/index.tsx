import * as React from "react";
import DrawBox from "./DrawBox";

interface GameState {
    usingPen: boolean;
}

export default class Game extends React.Component<{}, GameState> {

    constructor(props) {
        super(props);
        this.state = {
            usingPen: true,
        };
    }

    render() {
        return (
            <div>
                <DrawBox usingPen={this.state.usingPen}/>
                <DrawBox usingPen={this.state.usingPen}/>
                <DrawBox usingPen={this.state.usingPen}/>
            </div>
        );
    }
}
