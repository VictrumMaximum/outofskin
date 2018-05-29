import * as React from "react";
import Option from "./Option";
import routes from "../../routes";
import styles from "./styles.less";

export default class MenuBar extends React.Component<{}, {}> {

    render() {
        return (
			<div className={styles.menuBar}>
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
