import OutOfSkin from "./Music";
import Press from "./Press";
import Contact from "./Contact";
import Tour from "./Tour";
import Bio from "./Bio";
import Home from "./Home";

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
