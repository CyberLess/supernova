import { config } from "../config";

var defaults = {

	logoLoading: (e) => {

		let $this = $(e.currentTarget)

		let width = $this.width();

		$this.css('max-width', '100%').parent().css('width', `${width/1920*100}vw`)

		config.log('logo loaded', $this.attr('src'))

	},

	events: () => {

	},

	init: () => {

		defaults.events();

		// $('.catalog__item-logo img').on('load', defaults.logoLoading)
		$('.catalog__item-logo img').on('load', defaults.logoLoading)

	}
}

export { defaults }