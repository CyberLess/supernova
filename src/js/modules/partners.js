import { defaults } from "./defaults";
import { config } from "../config";

var partners = {

	dom: {
		container: $('.partners__list'),
		items: $('.partners__item')
	},

	vars: {
		rotation: 0,
		globalIndex: 0,
		start: 0,
		step: 0
	},

	setup : () => {

		partners.vars.rotation = 585 - (45 * (partners.dom.items.length - 1));
		partners.vars.globalIndex = partners.dom.items.length;
		partners.vars.step = (2 * Math.PI) / partners.dom.items.length;




	},

	position: () => {

		partners.dom.items.each( (index, el) => {

			let radius = (partners.dom.container.width() * 1.25 - $(el).height()) / 2,
				parentWidth = partners.dom.container.width(),

				tmpTop = ((partners.dom.container.outerHeight() / 2) + radius * Math.sin(partners.vars.start)) - ($(el).outerHeight() / 2),
				tmpLeft = ((partners.dom.container.outerWidth() / 2) + radius * Math.cos(partners.vars.start)) - ($(el).outerWidth() / 2),

				tmpTopPercent = 100 / (parentWidth / tmpTop),
				tmpLeftPercent = 100 / (parentWidth / tmpLeft);


			partners.vars.start += partners.vars.step;

			$(el).addClass('js-done').css({
				"margin-top": tmpTopPercent + "%",
				"margin-left": tmpLeftPercent + "%"
			}).find('.partners__item-preview')

		});

	},

	init: () => {

		// partners.dom.items.find('img').on('load', defaults.logoLoading)

		partners.setup();
		partners.position();
	
	}

}

export { partners }