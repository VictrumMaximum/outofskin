import OutOfSkin from "./OutOfSkin";
import Press from "./Press";
import Contact from "./Contact";
import Tour from "./Tour";
import Bio from "./Bio";

export default {
	"/": {
		component: Tour,
		background: "tour.jpg",
		title: "Home"
	},
	"/bio": {
		component: Bio,
		background: "normal_1080.jpg",
		title: "Bio"
	},
	"/outofskin": {
		component: OutOfSkin,
		background: "normal_1080.jpg",
		title: "Out of Skin"
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