import * as React from "react";
require("../../media/images/tour.jpg");

export default class Bio extends React.Component<{}, {}> {
	constructor(props) {
		super(props);
		document.documentElement.style.backgroundImage = props.background;
	}

	render() {
		const backgroundPath = "../../media/images/tour.jpg";
		const fullBackgroundPath = "url(" + backgroundPath + ")";

		return (
			<div className={"offset-xl-3 offset-2 col-xl-6 col-8"}>
				<em><strong>Een optreden van Out Of Skin is ruimtelijk, ongrijpbaar en ontvouwt zich gedurende de show van verstild naar expressief.</strong></em><br/><br/>
				Wouter Mol (zang/gitaar), Maartje Gilissen (harp) en Margot Kersing (viool) wonnen in november de SENA Grote Prijs Van Rotterdam 2016
				in de categorie Singer-Songwriter. Waar Wouter eerst alleen was, heeft Out Of Skin zich nu ontwikkeld tot een driekoppig performance team.<br/>
				Na het winnen van de Grote Prijs volgde hun debuut EP, live opgenomen in de theaterstudio van Rikke Korswagen en voorzien met artwork van fotograaf
				Richard Beukelaar. In samenwerking met kunstenares Rince de Jong en het Artemisia Koor gaven ze op 8 april 2017 de release show in Kantine Walhalla.<br/>
				Out Of Skin stond onder andere op Bevrijdingsfestival Rotterdam en de Leidse Hofjes Concerten. Momenteel doen ze mee met de Grote Prijs Van Nederland.<br/><br/>
				<em><strong>‘Kom uit je schulp en kijk eens naar binnen bij Out Of Skin'</strong></em>
			</div>
		);
	}
}
