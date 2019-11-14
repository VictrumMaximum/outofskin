import OutOfSkin from "./Pages/Music/index";
import Press from "./Pages/Press/index";
import Contact from "./Pages/Contact/index";
import Tour from "./Pages/Tour/index";
import Bio from "./Pages/Bio/index";

import tourBg from "./images/tour.jpg";
import bioBg from "./images/bio.jpg";
import musicBg from "./images/music.jpg";
import pressBg from "./images/press.jpg";
import contactBg from "./images/contact.jpg";
import fairAndEerie from "./images/Fair&EerieWebsite.jpg";
import aHouseSpitsOut from "./images/aHouseSpitsOutWebsite.jpg";

export const mobileBg = tourBg;

const routes: {
	[path: string]: {
		component: any;
		background: string;
		title: string;
	};
} = {
	"/tour": {
		component: Tour,
		background: aHouseSpitsOut,
		title: "Tour"
	},
	"/bio": {
		component: Bio,
		background: fairAndEerie,
		title: "Bio"
	},
	"/music": {
		component: OutOfSkin,
		background: aHouseSpitsOut,
		title: "Music"
	},
	"/press": {
		component: Press,
		background: fairAndEerie,
		title: "Press"
	},
	"/contact": {
		component: Contact,
		background: fairAndEerie,
		title: "Contact"
	}
};

const homepage = "/music";

export {
	routes,
	homepage
};
