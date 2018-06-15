import OutOfSkin from "./Pages/Music/index";
import Press from "./Pages/Press/index";
import Contact from "./Pages/Contact/index";
import Tour from "./Pages/Tour/index";
import Bio from "./Pages/Bio/index";
import Home from "./Pages/Home/index";

export const cover = "cover_1080(low).jpg";
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
		background: weird,
		title: "Bio"
	},
	"/music": {
		component: OutOfSkin,
		background: cover,
		title: "Music"
	},
	"/press": {
		component: Press,
		background: weird,
		title: "Press"
	},
	"/contact": {
		component: Contact,
		background: normal,
		title: "Contact"
	}
};
