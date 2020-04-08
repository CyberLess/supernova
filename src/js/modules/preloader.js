import { config } from "../config";


var preloader = {

	run: () => {
		$([document.documentElement, document.body]).animate({
			scrollTop: 0//$('.header').offset().top
		}, 1500, () => {
			// $('.preloader').css({
			// 	'position': 'absolute',
			// 	'left': 0,
			// 	'top': 0
			// });

			// $('html, body').removeClass('js-lock')

			// window.scrollTo(0,0)

		});

		let $headerCell = $('.header__parent');
		let $headerLogo = $('.header__logo_default');

		// $headerLogo.css({
		// 	// 'left': `${$headerCell.offset().left}px`,
		// 	'top': `${$headerCell.offset().top}px`,
		// 	'width': `${$headerCell.width()}px`,
		// }).on(config.transitionEnd, e => {
		// 	if(e.originalEvent.propertyName == 'top'){
		// 		$headerLogo.addClass('is-done').removeAttr('style')
		// 	}
		// })

		config.log('preloader.run')
	},

	init: () => {

		let $headerLogo = $('.header__logo_default');
		$headerLogo.css({
			// 'left': `${$headerCell.offset().left}px`,
			'top': `${$(window).height()/2 - $headerLogo.height()/2}px`,
		})

		setTimeout( preloader.run, 5000)

	}


};

export { preloader };