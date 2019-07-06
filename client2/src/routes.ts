import OutOfSkin from "./Pages/Music/index";
import Press from "./Pages/Press/index";
import Contact from "./Pages/Contact/index";
import Tour from "./Pages/Tour/index";
import Bio from "./Pages/Bio/index";
import Home from "./Pages/Home/index";

import tourBg from "./images/tour.jpg";
import bioBg from "./images/bio.jpg";
import musicBg from "./images/music.jpg";
import pressBg from "./images/press.jpg";
import contactBg from "./images/contact.jpg";

export const mobileBg = tourBg;

const routes: {
	[path: string]: {
		component: any;
		background: string;
		title: string;
	};
} = {
	"/": {
		component: Tour,
		background: tourBg,
		title: "Tour"
	},
	"/bio": {
		component: Bio,
		background: bioBg,
		title: "Bio"
	},
	"/music": {
		component: OutOfSkin,
		background: musicBg,
		title: "Music"
	},
	"/press": {
		component: Press,
		background: pressBg,
		title: "Press"
	},
	"/contact": {
		component: Contact,
		background: contactBg,
		title: "Contact"
	}
};

export default routes;
