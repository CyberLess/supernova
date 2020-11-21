import { config } from "../config";

var accordion = {
	
	slide: (e) => {
		
		let parent = $(e.currentTarget).closest('.js-accordion');
		
		if ( parent.hasClass('is-active') ) {
			parent.removeClass('is-active').find('.js-accordion-body').slideUp(300);
		} else {
			$(".js-accordion.is-active").removeClass('is-active');
			$('.js-accordion-body:visible').slideUp(300);
			parent.addClass('is-active').find('.js-accordion-body').slideDown(300);
		}
	},
	
	init: () => {
		
		let container = $(".accordion__list");
		let item = $(".accordion__item");
		
		item.each(function(){
			let index = $(this).index() + 1;
			
			if ( index < 10 ) {
				index = '0' + index;
			}
			
			$(this).find('.accordion__number').text(index);
		});
		
		$(".accordion__item:first-child").addClass('is-active').find('.accordion__content').show();
		
		$(document).on("click", '.js-accordion-btn', accordion.slide);
	}
};

export { accordion };
