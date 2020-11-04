import * as React from "react";

import {ReactComponent as PhoneIcon} from "../../images/icons/phone.svg";
import {ReactComponent as EmailIcon} from "../../images/icons/email.svg";
import {ReactComponent as DropboxIcon} from "../../images/icons/dropbox.svg";

import styles from "./styles.module.scss";

export default class Contact extends React.Component<{}, {}> {
	render() {
		return (
			<div id={styles.informationWrapper} className={"whitePlaneBackground col"}>
				<table className={styles.information}>
					<tbody>
						<tr>
							<td className={styles.iconCell}>
								<PhoneIcon className={styles.icon}/>
							</td>
							<td>+316 42 96 12 33</td>
						</tr>
						<tr>
							<td className={styles.iconCell}>
								<PhoneIcon className={styles.icon}/>
							</td>
							<td>+316 15 58 62 06</td>
						</tr>
						<tr>
							<td className={styles.iconCell}>
								<EmailIcon className={styles.icon}/>
							</td>
							<td>band@outofskin.com</td>
						</tr>
						<tr>
							<td className={styles.iconCell}>
								<DropboxIcon className={styles.icon}/>
							</td>
							<td>
								<a href={"https://www.dropbox.com/sh/wgen8pi81nojwdb/AAABu1ZapzS2w_BiJ4WEuHfFa?dl=0"}
									target={"blank"}
									className={styles.blackToWhiteLink}>
									Press-kit
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}
