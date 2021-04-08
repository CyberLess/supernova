import { config } from "../config";
import { scrolling } from "./scrolling";

var screen = {
	method:{
		setLogo(el){

			if($(el).hasClass('is-done')) return false;
 
			const position = {
				windowX: $(window).width() / 2,
				windowY: $(window).height() / 2,
			}

			const offset = $(el).parent().offset();

			const x = position.windowX - offset.left - $(el).width() / 2;
			const y = position.windowY - offset.top - $(el).height() / 2;
			
			console.log(offset, x, y, $(el).width(), $(el).height())

			$(el).css({
				transform: `translate(${x}px, ${y}px)`,
				// transform: `translate(-50%, ${y}px)`,
				visibility: `visible`
			})

		},

		doneLogo(el){
			$(el).addClass('is-done').css({
				transition: 'ease .5s',
				transform: `translate(0, 0px)`,
				width: `100%`
			}).on(config.transitionEnd, (e) => {
				if(e.originalEvent.propertyName == "width"){
					$('html, body').removeClass('js-lock');

					if ($('.preloader-screen').is(':visible')){
						$('.preloader-screen').fadeOut(400)
					}else{
						$('.preloader-screen').css('display', 'none')
					}
					
					
					scrolling.run()
				}
			})
		}
	},
	init(){
		let logo = $('.js-site-logo')[0];

		if (!$(logo).length) {

			$(window).on('load', () => {
				console.log('scrolling run')
				setTimeout(scrolling.run, 100)
			});

			return false;
		}


		screen.method.setLogo(logo);
		$(window).on('resize', () => screen.method.setLogo(logo));

		$(window).on('load', () => {
			setTimeout(() => {
				screen.method.doneLogo(logo);
			}, 300)
		})

	}
}

export default screen;