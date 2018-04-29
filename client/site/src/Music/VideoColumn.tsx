import * as React from "react";

interface VideoColumnProps {
	header: string;
	videos: string[]
}

export default class VideoColumn extends React.Component<VideoColumnProps, {}> {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={{width: "40%", display: "inline-block", textAlign: "left", minWidth: "30em", paddingLeft: "3em", paddingRight: "3em"}}>
				<h3>{this.props.header}</h3>
				{this.props.videos.map((url) => {
					return (
						<div style={
							{
								position: "relative",
								paddingBottom: "56.25%",
								paddingTop: "30px",
								height: "0",
								overflow: "hidden"
							}}>
							<iframe
								style={{
									position: "absolute",
									top: "0",
									left: "0",
									width: "100%",
									height: "100%",
									minWidth: "20em"
								}}
								height="100%"
								width="100%"
								src={url}
								frameBorder="0"
								allowFullScreen>
							</iframe>
						</div>
					);
				})}
			</div>
		);
	}
}
