import lottie from "lottie-web";
import { config } from "../config";

var svglottie = {

	items: {

	},

	defaults: {
		animType: 'svg',
		autoplay: true,
		loop: true,		
	},

	run: (loader, file) => {

		let settings = JSON.parse(JSON.stringify(svglottie.defaults));
		let ID = $(loader).attr('id') ? $(loader).attr('id') : config.guidGenerator();

		settings['wrapper'] = loader;
		settings['path'] = file;

		if($(loader).attr('data-loop')){
			settings['loop'] = $(loader).data('loop');
		}

		if($(loader).attr('data-autoplay')){
			settings['autoplay'] = $(loader).data('autoplay');
		}

		svglottie.items[ID] = lottie.loadAnimation(settings);	


		if($(loader).attr('data-next')){

			let $next = $(`#${$(loader).data('next')}`);
			let next_ID = $next.attr('id');

			svglottie.items[ID].addEventListener('complete', () => {

				$(loader).addClass('js-hidden');

				$next.removeClass('js-hidden');

				config.log('complete animation', ID, svglottie.items)

				svglottie.items[next_ID].play();

			})

		}
	},

	init: () => {

		let $elements = $('.js-lottie');

		if(!$elements.length)
			return false;

		$elements.each((i, el) => {

		    let file  = `/app/json/${$(el).data('file')}/data.json`;

			svglottie.run(el, file);

		})

	}

}

export { svglottie };