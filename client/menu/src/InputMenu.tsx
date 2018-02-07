import * as React from "react";

export default class InputMenu extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <table>
                <tr>
                    <td>Event name</td>
                    <td><input/></td>
                </tr>
	            <tr>
		            <td>Event link</td>
		            <td><input/></td>
	            </tr>
            </table>
        );
    }
}
