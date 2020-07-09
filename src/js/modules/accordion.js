import { config } from "../config";

var accordion = {
	init: () => {
		
		let container = $(".accordion__list");
		let item = $(".accordion__item");
		
		item.each(function(){
			let index = $(this).index() + 1;
			
			if ( index < 10 ) {
				index = '0' + index;
			}
			
			$(this).find('.accordion__number').text(index);
		}).click(function(){
			
			if ( $(this).hasClass('is-active') ) {
				$(this).removeClass('is-active').find('.accordion__content').slideUp(300);
			} else {
				$(".accordion__item.is-active").removeClass('is-active');
				$('.accordion__content:visible').slideUp(300);
				$(this).addClass('is-active').find('.accordion__content').slideDown(300);
			}
			
		});
		
		$(".accordion__item:first-child").addClass('is-active').find('.accordion__content').show();
		
		$(document).on("click", '', function() {

		});
	}
};

export { accordion };
