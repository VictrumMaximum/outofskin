import OutOfSkin from "./Pages/Music/index";
import Press from "./Pages/Press/index";
import Contact from "./Pages/Contact/index";
import Tour from "./Pages/Tour/index";
import Bio from "./Pages/Bio/index";
import Home from "./Pages/Home/index";

require("./media/images/tour.jpg");
require("./media/images/bio.jpg");
require("./media/images/press.jpg");
require("./media/images/contact.jpg");

const tourBg = "tour.jpg";
const bioBg = "bio.jpg";
const pressBg = "press.jpg";
const contactBg = "contact.jpg";

export const mobileBg = tourBg;

export default {
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
		background: tourBg,
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
