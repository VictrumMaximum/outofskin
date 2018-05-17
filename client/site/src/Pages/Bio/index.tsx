import * as React from "react";
import {connect} from "react-redux";
import axios, {AxiosResponse} from "axios";
import {setBio} from "../../redux/actions/bio";
import * as showdown from "showdown";
const styles = require("./styles.less");

const bioURL = "/bioData";

interface BioProps {
	bio: string,
	setBio: (newBio: string) => void
}

class Bio extends React.Component<BioProps, {}> {
	converter;

	constructor(props) {
		super(props);
		this.converter = new showdown.Converter();
		document.documentElement.style.backgroundImage = props.background;
	}

	componentDidMount() {
		if (this.props.bio.length === 0) {
			this.fetchBio();
		}
	}

	fetchBio() {
		axios.get(bioURL).then((response: AxiosResponse) => {
			const bio = response.data.bio;
			this.props.setBio(bio);
			this.setState({
				text: bio
			});
		});
	}

	render() {
		return (
			//<div className={styles.bio} dangerouslySetInnerHTML={{__html: this.converter.makeHtml(this.props.bio)}}>
			<div  className={styles.bio}>
				<p>
					<strong>
				Wie ben je als je uit je schulp kruipt?
					</strong>
				De driekoppige band Out Of Skin wil het hele spectrum van het menselijke zijn een stem geven.
				Ze spelen daarom letterlijk en figuurlijk met de theatrale ruimte via hun moderne,
				alternatieve popmuziek over de psyche van de mens.
				Overweldigende harp, ijle tot ruige vioolstreken, slaggitaar en veelzijdige zang.
				Als je er eenmaal in zit, wil je er niet meer uit.
				Een optreden van Out Of Skin is ruimtelijk, ongrijpbaar en ontvouwt zich gedurende
				de show van verstild naar expressief.
				Hun muziek is genreloos en zweeft ergens tussen Radiohead, Tamino en Sigur Rós.
				</p>
				<p>
				Out Of Skin werd dit jaar twee keer avondwinnaar tijdens de Grote Prijs Van Nederland en
				stond in de finale in Paradiso.
				Eind 2016 wonnen ze de SENA Grote Prijs Van Rotterdam.
				Waar frontman Wouter Mol eerst alleen was, was deze winst het begin van Out Of Skin.
				Hun debuut-ep volgde, live opgenomen in de theaterstudio van Rikke Korswagen en
				voorzien met artwork van fotograaf Richard Beukelaar.
				Vanaf augustus 2018 zullen een aantal nieuwe singles volgen,
				opgenomen bij Simon Akkermans in het legendarische Kytopia.
				</p>
				<p>
				Vindt je het leuk om op de hoogte te blijven? Volg de band op Spotify,
				Soundcloud, YouTube, Instagram, Facebook en geef je mailadres op via
				band@outofskin.com voor de nieuwsbrief!
				</p>

				<p>
				<strong>
					‘Kom uit je schulp en kijk eens naar binnen bij Out Of Skin'
				</strong>
				</p>
				<p>
				Wouter Mol: gitaar en zang
					<br/>
				Maartje Gilissen: harp en percussie
					<br/>
				Margot Kersing: viool
				</p>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		bio: state.bio
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		setBio: (newBio: string) => dispatch(setBio(newBio))
	}
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Bio)
