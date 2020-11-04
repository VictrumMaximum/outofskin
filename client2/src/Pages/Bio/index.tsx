import * as React from "react";
import {Markdown} from "react-showdown";
// import MarkdownPreview from "../../menu/Bio/MarkdownPreview";
import styles from "./styles.module.scss";
import {part1, part2, part3} from "../../data/bio"; // this file is ignored by git!

export default class Bio extends React.Component<{}, {}> {
	render() {
		const artistSection = "";

		return (
			<div id={styles.bio}>
				<section>
					<div className={"whitePlaneBackground"}>
						<p>
							<strong className={styles.artistName}>Meet your inner monsters.</strong> Dutch trio Out Of Skin wants to embody all the aspects of humankind.
						</p>
						<p>
							Electronic sounds interwoven with harp and guitar, guided by the expressive vocals brings you into a deeper state of mind.
						</p>
						<p>
							But, they also regularly pull you out to put you back in place. Out Of Skin considers our interactions, choices and inner monsters.
						</p>

					</div>
				</section>
				<section>
					<div className={"whitePlaneBackground"}>
						<p>
							<strong className={styles.artistName}>Out Of Skin</strong> took part in the prestigious talent contest Grote Prijs Van Nederland 2018 and made it to the finals at Paradiso, Amsterdam.
						</p>
						<p>
							They entered Simon Akkermans’ Epic Rainbow Unicorn Studio (Binkbeats, Jo Goes Hunting) where they discovered a special penchant for merging electronics and acoustics.
						</p>
						<p>
							Out Of Skin released two singles, 'The Fair and Eerie' and 'A House Spits Out' while touring with Popronde 2019. The band is working on an album now.
						</p>
					</div>
				</section>
				<section>
					<div id={styles.artistSection}
						className={"whitePlaneBackground"}>
						<p>
							<strong className={styles.artistName}>Wouter Mol</strong><br/> voice and guitar
						</p>
						<p>
							<strong className={styles.artistName}>Maartje Gilissen</strong><br/> harp and synths
						</p>
						<p>
							<strong className={styles.artistName}>Michiel de Haan</strong><br/> beats, bass and electronics
						</p>
					</div>
				</section>
			</div>
		);
	}
}
