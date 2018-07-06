import * as React from "react";
import "./styles.less";
import "./fontStyle.css";

require("./media/fonts/mic-32regular.ttf");

require("./media/faviconit/favicon.ico");
require("./media/faviconit/favicon-16.png");
require("./media/faviconit/favicon-32.png");
require("./media/faviconit/favicon-57.png");
require("./media/faviconit/favicon-60.png");
require("./media/faviconit/favicon-64.png");
require("./media/faviconit/favicon-70.png");
require("./media/faviconit/favicon-72.png");
require("./media/faviconit/favicon-76.png");
require("./media/faviconit/favicon-96.png");
require("./media/faviconit/favicon-114.png");
require("./media/faviconit/favicon-120.png");
require("./media/faviconit/favicon-144.png");
require("./media/faviconit/favicon-150.png");
require("./media/faviconit/favicon-152.png");
require("./media/faviconit/favicon-160.png");
require("./media/faviconit/favicon-180.png");
require("./media/faviconit/favicon-192.png");
require("./media/faviconit/favicon-310.png");
require("./media/faviconit/browserconfig.xml");

import {Route, BrowserRouter} from "react-router-dom";
import routes from "./routes";
import ContentFixator from "./Pages/ContentFixator";
import MenuBar from "./Static/MenuBar/index";
import SocialMedia from "./Static/SocialMedia/index";

export interface MainContainerState {
    textColor: string;
    textSize: number;
    headerColor: string;
    headerSize: number;
    borderColor: string;
    borderSize: number;
}

export default class MainContainer extends React.Component<{}, MainContainerState> {
    constructor(props) {
        super(props);
        this.state = {
            textColor: "white",
            textSize: 16,
			headerColor: "black",
			headerSize: 24,
            borderColor: "black",
            borderSize: 0.3
        };
        this.styleChangeHandler = this.styleChangeHandler.bind(this);
		this.changeTextSize = this.changeTextSize.bind(this);
		this.handleHeaderChange = this.handleHeaderChange.bind(this);
		this.changeHeaderSize = this.changeHeaderSize.bind(this);
		this.changeBorderSize = this.changeBorderSize.bind(this);
    }

    styleChangeHandler(evt) {
        const id = evt.target.id;
        const value = evt.target.value;
        this.setState({
            [id]: value
        });
    }

    changeTextSize(scalar) {
    	this.setState({
			textSize: (this.state.textSize + scalar)
		});
	}

	changeHeaderSize(scalar) {
		this.setState({
			headerSize: (this.state.headerSize + scalar)
		}, () => {
			const list = document.getElementsByTagName("H3");
			for (let i = 0; i < list.length; i++) {
				list[i]["style"].fontSize = this.state.headerSize + "px";
			}
		});
	}

	handleHeaderChange(evt) {
    	this.setState({
			[evt.target.id]: evt.target.value
		}, () => {
			const list = document.getElementsByTagName("H3");
			for (let i = 0; i < list.length; i++) {
				list[i]["style"].color = this.state.headerColor;
			}
		});
	}

	changeBorderSize(scalar) {
		this.setState({
			borderSize: (this.state.borderSize + scalar)
		});
	}

	render() {
		return (
			<BrowserRouter>
				{/*router may only have 1 child element*/}
				<div>
					<MenuBar />
					<div style={{zIndex: 1, position: "relative", width: "12em"}}>
						Text color
                    	<input id={"textColor"}
							   type={"color"}
							   onChange={this.styleChangeHandler} />
						<br/>
						Text size
						<input id={"textSize"}
							   style={{width: "3em"}}
							   value={this.state.textSize} />
						<button onClick={() => {this.changeTextSize(1)}}>+</button>
						<button onClick={() => {this.changeTextSize(-1)}}>-</button>
						<br/>
						Header color
						<input id={"headerColor"}
							   type={"color"}
							   onChange={this.handleHeaderChange} />
						<br/>
						Header size
						<input id={"headerSize"}
							   style={{width: "3em"}}
							   value={this.state.headerSize} />
						<button onClick={() => {this.changeHeaderSize(1)}}>+</button>
						<button onClick={() => {this.changeHeaderSize(-1)}}>-</button>
						<br/>
						Border color
						<input id={"borderColor"} type={"color"} onChange={this.styleChangeHandler} />
						<br/>
						Border size
						<input id={"borderSize"}
							   style={{width: "3em"}}
							   value={this.state.borderSize} />
						<button onClick={() => {this.changeBorderSize(0.1)}}>+</button>
						<button onClick={() => {this.changeBorderSize(-0.1)}}>-</button>
						<br/>
						{Object.keys(this.state).map((key) => {
							return (key + ": " + this.state[key] + ",\n");
						})}
					</div>
					<div style={{
						color: this.state.textColor,
						fontSize: this.state.textSize + "px",
						textShadow: "" +
						"			-" + this.state.borderSize + "px 0 " + this.state.borderColor + "," +
						"            -" + this.state.borderSize + "px -" + this.state.borderSize + "px " + this.state.borderColor + "," +
						"            0 -" + this.state.borderSize + "px " + this.state.borderColor + "," +
						"            " + this.state.borderSize + "px -" + this.state.borderSize + "px " + this.state.borderColor + "," +
						"          " + this.state.borderSize + "px 0 " + this.state.borderColor + "," +
						"          " + this.state.borderSize + "px " + this.state.borderSize + "px " + this.state.borderColor + "," +
						"          0  " + this.state.borderSize + "px " + this.state.borderColor + "," +
						"          -" + this.state.borderSize + "px  " + this.state.borderSize + "px " + this.state.borderColor
					}}>
						{Object.keys(routes).map(path => {
							return (
									<Route
										key={path}
										exact path={path}
										render = {(routeProps) => {
											// react syntax requires component names to start with capital letter
											const Component = routes[path].component;
											return <ContentFixator
												content={<Component {...routeProps}/>}
												background={routes[path].background}
												style={this.state}/>
										}}/>);
						})}
					</div>
					<SocialMedia/>
				</div>
			</BrowserRouter>
		);
	}
}
