import OutOfSkin from "./Pages/Music";
import Press from "./Pages/Press";
import Contact from "./Pages/Contact";
import Tour from "./Pages/Tour";
import Bio from "./Pages/Bio";
import Home from "./Pages/Home";

const cover = "cover_1080(low).jpg";
const normal = "normal_1080(low).jpg";
const weird = "weird_1080(low).jpg";

export default {
	"/": {
		component: Tour,
		background: cover,
		title: "Tour"
	},
	"/bio": {
		component: Bio,
		background: normal,
		title: "Bio"
	},
	"/music": {
		component: OutOfSkin,
		background: cover,
		title: "Music"
	},
	"/press": {
		component: Press,
		background: normal,
		title: "Press"
	},
	"/contact": {
		component: Contact,
		background: normal,
		title: "Contact"
	}
};
