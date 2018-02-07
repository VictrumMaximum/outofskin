import * as React from "react";
require("../../media/images/tour.jpg");

export default class OutOfSkinContainer extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<div className={"col-11"} style={{border: "1px solid green"}}>
				<div className={"row"}>
					<div className={"col-2"}>
						albumimage
					</div>
					<div className={"col-4"}>
						Tekst
					</div>
					<div className={"col-4"}>
						Videos
					</div>
				</div>
			</div>
		);
	}
}
