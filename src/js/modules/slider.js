import "owl.carousel";
import { config } from "../config";

var slider = {
	
	apartments: () => {
		$('.apartments__list').each(function(){
			if( $(window).innerWidth() < 580 ) {
				$(this).addClass('js-slider owl-carousel owl-loaded');
			}
		});
	},
	
	
	tabs: (e) => {
		let index = $(e.currentTarget).index();
		
		let owl = $(e.currentTarget).closest('section').find('.owl-carousel');
		
  		owl.trigger( 'to.owl.carousel', [index, 500] );
		
		$(e.currentTarget).closest('section').find('.js-slider-to.is-active').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');
		
	},
	
	init: () => {
		
		slider.apartments();
		
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
		
		$('.js-slider-about').each(function(){
			
			let prev = $(this).find('.owl-arrow_prev');
			let next = $(this).find('.owl-arrow_next');
			let parent = $(this).closest('.owl-carousel');
			
			$(this).owlCarousel({
				loop: true,
				nav: false,
				dots: false,
				smartSpeed: 500,
				items: 1,
				responsive:{
				}
			});
		});
		
		$(document).on("click", '.owl-arrow', function() {

			let dir = $(this).hasClass('owl-arrow_next') ? 'next' : 'prev';

			let owl = $(this).closest('section').find('.owl-carousel');

			owl.trigger(dir + '.owl.carousel', [500]);

		});
		
		
		$(document).on("click", '.js-slider-to', slider.tabs );
		
		
		$('.js-slider-about').on('changed.owl.carousel', function(event) {
			var item = event.item.index - 2;
			$('.js-slider-to.is-active').removeClass('is-active')
			$('.js-slider-to:nth-child(' +item+ ')').addClass('is-active');
			
			console.log(item);
		})
		
	}
};

export { slider };
