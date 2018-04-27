import * as React from "react";
import Option from "./Option";
import routes from "../../routes";

export default class MenuBar extends React.Component<{}, {}> {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
			<div className="row justify-content-center" style={{width: "100%"}}>
				{Object.keys(routes).map((path) => {
					return <Option
						key={path}
						title={routes[path].title}
						path={path}
					/>
				})}
			</div>
        );
    }
}
