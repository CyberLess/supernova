// import { preloader } from "./modules/preloader";
import { defaults } from "./modules/defaults";
import { forms } from "./modules/forms";
import { stars } from "./modules/stars";
import { panel } from "./modules/panel";
// import { lines } from "./modules/lines";
// import { scrolling } from "./modules/scrolling";
// import { svglottie } from "./modules/lottie";
import { modals } from "./modules/modals";
import { slider } from "./modules/slider";
import { map } from "./modules/map";
import { partners } from "./modules/partners";
import { accordion } from "./modules/accordion";
import { calc } from "./modules/calc";
import { config } from "./config";

var App = () => {};

App.prototype.init = () => {

	// preloader.init();
	defaults.init();
	forms.init();
	panel.init();
	stars.init();
	// lines.init();
	// scrolling.init();
	// svglottie.init();
	partners.init();
	map.init();
	modals.init();
	slider.init();
	accordion.init();
	calc.init();

	config.log('app init')
	
};

export { App };