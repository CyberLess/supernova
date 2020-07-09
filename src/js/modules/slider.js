import "owl.carousel";
import { config } from "../config";

var slider = {
	init: () => {
		$('.js-slider').each(function(){
			
			let prev = $(this).find('.owl-arrow_prev');
			let next = $(this).find('.owl-arrow_next');
			let parent = $(this).closest('.owl-carousel');
			
			$(this).owlCarousel({
				autoWidth: true,
				loop: true,
				nav: false,
				dots: false,
				smartSpeed: 500,
				center:true,
				responsive:{
					0:{
						autoWidth: false,
						center:false,
						items: 1,
						dots: true,
						smartSpeed: 300,
					},
					580:{
						autoWidth: false,
						center:false,
						items: 1,
					},
					900:{
						autoWidth: true,
						center:true,
						smartSpeed: 500,
					}
				}
			});
		});
		
		$(document).on("click", '.owl-arrow', function() {

			let dir = $(this).hasClass('owl-arrow_next') ? 'next' : 'prev';

			let owl = $(this).closest('section').find('.owl-carousel')

			owl.trigger(dir + '.owl.carousel', [500]);

		});
	}
};

export { slider };
