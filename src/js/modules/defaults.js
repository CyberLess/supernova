import { config } from "../config";

var defaults = {

	logoLoading: (e) => {

		let $this = $(e.currentTarget)

		let width = $this.width();

		$this.css('max-width', '100%').parent().css('width', `${width/1920*100}vw`)

		config.log('logo loaded', $this.attr('src'))

	},

	mobileMenu: (e) => {
		let $this = $(e.currentTarget),
			$mobile = $('.mobile'),
			$container = $('html, body');

		$this.toggleClass('is-active');
		$mobile.toggleClass('is-active');
		$container.toggleClass('js-lock');
	},

	categoriesModal: (e) => {
		let ww = $(window).width();
		let $this = $(e.currentTarget).closest('.categories__item'),
			$container = $('html, body');

		if(ww <= 768){

			e.preventDefault()

			$this.addClass('is-visible');
			$container.addClass('js-lock');

		}
	},

	categoriesModalClose: (e) => {
		let $this = $(e.currentTarget).closest('.categories__item'),
			$container = $('html, body');

		config.log('categoriesModalClose')

		$this.removeClass('is-visible');
		$container.removeClass('js-lock');
	},


	events: () => {

	},

	init: () => {

		defaults.events();

		// $('.catalog__item-logo img').on('load', defaults.logoLoading)

		$('.catalog__item-logo img').on('load', defaults.logoLoading)

		$('.js-mobile').on('click', defaults.mobileMenu)

		$('.js-categories').on('click', defaults.categoriesModal)

		$('.js-categories-close').on('click', defaults.categoriesModalClose)

	}
}

export { defaults }