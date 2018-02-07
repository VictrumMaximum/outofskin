import OutOfSkin from "./Music";
import Press from "./Press";
import Contact from "./Contact";
import Tour from "./Tour";
import Bio from "./Bio";
import Home from "./Home";

export default {
	"/": {
		component: Tour,
		background: "cover_1080.jpg",
		title: "Tour"
	},
	"/bio": {
		component: Bio,
		background: "normal_1080.jpg",
		title: "Bio"
	},
	"/music": {
		component: OutOfSkin,
		background: "cover_1080.jpg",
		title: "Music"
	},
	"/press": {
		component: Press,
		background: "normal_1080.jpg",
		title: "Press"
	},
	"/contact": {
		component: Contact,
		background: "normal_1080.jpg",
		title: "Contact"
	}
};
