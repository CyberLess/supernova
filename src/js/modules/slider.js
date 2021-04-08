import "owl.carousel";
import { config } from "../config";
import { defaults } from "./defaults";

var sliders = {
	
	tabs: (e) => {
		let index = $(e.currentTarget).index();
		
		let owl = $(e.currentTarget).closest('section').find('.owl-carousel');
		
  		owl.trigger( 'to.owl.carousel', [index, 500] );
		
		$(e.currentTarget).closest('section').find('.js-slider-to.is-active').removeClass('is-active');
		$(e.currentTarget).addClass('is-active');
		
	},
	
	selector: ".js-slider",

	settings: {
		nav: true,
		dots: false,
		loop: true,
		autoplay: false,
		smartSpeed: 600,
		margin: 20,
		navText: [
			'<svg class="icon icon-prev" viewBox="0 0 15 16"><use xlink:href="/wp-content/themes/karanikola-supernova/app/icons/sprite.svg#prev"></use></svg>',
			'<svg class="icon icon-next" viewBox="0 0 16 16"><use xlink:href="/wp-content/themes/karanikola-supernova/app/icons/sprite.svg#next"></use></svg>',
		],
	},

	bar: (el, value) => {
		$(el).find(".owl-progress-bar").css("width", `${value}%`);
	},

	build: (selector) => {
		let data = $(selector).attr("data-settings")
			? $(selector).data("settings")
			: {};

		let clone = JSON.parse(JSON.stringify(sliders.settings));

		let current = Object.assign(clone, data);

		$(selector)
			.addClass("owl-carousel")
			.on("initialized.owl.carousel", (e) => {
				let $slider = $(e.target);
				let $logos = $slider.find(".js-logo:not([style])");

				if ($logos.length) {
					$logos.each((i, el) => {
						if ($(el).hasClass("is-changed")) return false;

						defaults.logoLoading(el);
					});
				}

				// counter
				let $counter = $(e.target).find(".owl-counter");
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;

				if ($slider.attr("data-progress-bar")) {
					let bar = $slider.data("progress-bar");

					sliders.bar(bar, 100 / (length / current));
					console.log("bar is", bar, 100 / (length / current));
					$('.owl-progress-handle').each(function(){
						$(this).css('width', ( $(this).closest('.owl-progress').width() / (length / current) ) + "px");
						$(this).attr('data-length', length);
					});
				}
			
				if ( current < 10 ) {
					current = '0'+current;
				}
			
				if ( length < 10 ) {
					length = '0'+length;
				}

				if ($slider.attr("data-counter")) {
					let counter = $slider.data("counter");
					$(counter).html(
						`<div class="owl-counter"><span class="owl-counter-current">${current}</span> / ${length}</div>`
					);
				}
			})

			.on("drag.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					e.preventDefault();
				};
			})
			.on("dragged.owl.carousel", (event) => {
				document.ontouchmove = (e) => {
					return true;
				};
			})
			.on("changed.owl.carousel", (e) => {
				if (!e.namespace) {
					return;
				}
				let carousel = e.relatedTarget;
				let length = carousel.items().length;
				let current = carousel.relative(carousel.current()) + 1;
			
				if ( current < 10 ) {
					current = '0'+current;
				}

				if ($(e.target).attr("data-progress-bar")) {
					let bar = $(e.target).data("progress-bar");

					sliders.bar(bar, 100 / (length / current));

					console.log("bar is", bar, 100 / (length / current));
				}

				if ($(e.target).attr("data-counter")) {
					let counter = $(e.target).data("counter");
					$(counter).find('.owl-counter-current').text(current);
				}
			})
			.owlCarousel(current);
		
	},

	destroy: (selector) => {
		if ($(selector).hasClass("owl-loaded"))
			$(selector)
				.trigger("destroy.owl.carousel")
				.removeClass("owl-carousel");
		$(selector).find(".owl-counter").remove();
	},

	run: (selector) => {
		sliders.build(selector);
	},

	init: () => {
		if (!$(sliders.selector).length) return false;

		$(window).on("load", (e) => {
			$(sliders.selector).each((i, el) => {
				sliders.run(el);
			});
		});
		
		/*$('.js-slider').each(function(){
			
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
					1025:{
						autoWidth: true,
						center:true,
						smartSpeed: 500,
					}
				}
			});
		});*.
		
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
		
		$('.js-slider-review').each(function(){
			
			let prev = $(this).find('.owl-arrow_prev');
			let next = $(this).find('.owl-arrow_next');
			let parent = $(this).closest('.owl-carousel');
			
			$(this).owlCarousel({
				loop: true,
				nav: false,
				dots: false,
				smartSpeed: 500,
				items: 2,
				responsive:{
					0:{
						items: 1,
						smartSpeed: 300,
						autoHeight: true
					},
					580:{
						smartSpeed: 500,
						items: 2,
						autoHeight: false
					}
				}
			});
		});*/
		
		
		
		$(document).on("click", '.owl-arrow', function() {

			let dir = $(this).hasClass('owl-arrow_next') ? 'next' : 'prev';

			let owl = $(this).closest('section').find('.owl-carousel');

			owl.trigger(dir + '.owl.carousel', [500]);

		});
		
		
		$(document).on("click", '.js-slider-to', sliders.tabs );
		
		$('.js-slider-to:first').addClass('is-active');
		
		if ( $(window).innerWidth() < 581 ) {
			$('.partner__item').unwrap();
		}
		
		$('.js-slider-about').on('changed.owl.carousel', function(event) {
			var item = event.item.index - 2;
			$('.js-slider-to.is-active').removeClass('is-active')
			$('.js-slider-to:nth-child(' +item+ ')').addClass('is-active');
			
			console.log(item);
		});
		
		/*$('.js-slider-partner').each(function(){
			
			let prev = $(this).find('.owl-arrow_prev');
			let next = $(this).find('.owl-arrow_next');
			let parent = $(this).closest('.owl-carousel');
			
			if ( $(window).innerWidth() < 581 ) {
				$('.partner__item').unwrap();
			}
			
			$(this).owlCarousel({
				loop: true,
				nav: false,
				dots: false,
				smartSpeed: 500,
				items: 1,
				responsive:{
					0:{
						autoWidth: true,
						smartSpeed: 300,
					},
					580:{
						autoWidth: false,
						items: 1,
						smartSpeed: 500,
					}
				}
			});
		});*/
		
	}
};

export { sliders };
