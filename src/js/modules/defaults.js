import { config } from "../config";
import mp from "./map-objects";
import { modals } from "./modals";

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

	openObjects() {
		
		if ($(this).is(':checked')){

			$(this).closest('.js-parent-checkbox').addClass('is-active')
			
			modals.open(false, "#modal-map-objects");
			mp.newPins();
		}else{
			$(this).closest('.js-parent-checkbox').removeClass('is-active')
		}
	},

	propCheckbox(el, state){
		console.log('click state', state)
		$(el).closest('.js-parent-checkbox').find('input').prop('checked', state).trigger('change');
	},

	smoothScroll(e){
		e.preventDefault();

		$('html, body').animate({
			scrollTop: $($(this).attr('href')).offset().top
		}, 700);		
	},


	events: () => {

	},

	init: () => {

		defaults.events();

		// $('.catalog__item-logo img').on('load', defaults.logoLoading)

		// $('.catalog__item-logo img').on('load', defaults.logoLoading)

		$('.js-mobile').on('click', defaults.mobileMenu)

		$('.js-categories').on('click', defaults.categoriesModal)

		$('.js-categories-close').on('click', defaults.categoriesModalClose)


		$('.js-toggle-objects').on('change', defaults.openObjects)

		$('a[href^="#"]:not(.js-modal)').on('click', defaults.smoothScroll)

		$('.js-check-listing').on('click', function() {
			defaults.propCheckbox(this, false)
		})
		$('.js-check-map').on('click', function () {
			defaults.propCheckbox(this, true)
		})

	}
}

export { defaults }