import * as React from "react";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import {setBackground} from "../../redux/actions/background";

const style = require("./menuBar.less");

interface OptionProps {
    title: string;
    route: string;
    background: string;
    setBackground: (background) => void;
}

class Option extends React.Component<OptionProps, {}> {
    constructor(props) {
        super(props);
    }

    onClick() {
		this.props.setBackground(this.props.background);
	}
    
    render() {
        return (
			<div className={"col-2 " + style.optionDiv}>
				<h3>
					<Link exact to={"/"+this.props.route}
						className={style.optionLink}
						onClick={this.onClick.bind(this)}>
						{this.props.title}
						</Link>
				</h3>
			</div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setBackground: (background) => {
			dispatch(setBackground(background));
		}
	};
};

export default connect(
	() => {return {};},
	mapDispatchToProps
)(Option);
