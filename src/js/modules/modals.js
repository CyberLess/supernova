import "magnific-popup";
import { config } from "../config";

var modals = {
	close: (e) => {
		if (!e) return false;

		e.preventDefault();

		config.log("close modal");

		$.magnificPopup.close();
	},

	open: (e, modal) => {
		e = e || false;

		if (e && !$(e.currentTarget).hasClass('js-radio')) {
			e.preventDefault();
		}

		// modals.close();

		// $.magnificPopup.close();

		modal =
			modal ||
			(e != false
				? $(e.currentTarget).attr("href")
					? $(e.currentTarget).attr("href")
					: $(e.currentTarget).data("modal")
				: e);

		if (!modal) return false;

		let open = $.magnificPopup.instance.isOpen;

		if (open) {
			var mfp = $.magnificPopup.instance;

			mfp.items = [];

			// modify the items array (push/remove/edit)
			mfp.items.push({
				src: modal,
				type: "inline",
			});

			config.log("updateItemHTML");

			// call update method to refresh counters (if required)
			mfp.updateItemHTML();
		} else {
			if (e && $(e.currentTarget).attr("data-youtube")) {

				$(modal).append(`<iframe class="js-iframe-video" width="1331" height="599" frameborder="0" src="${$(e.currentTarget).data("youtube")}?autoplay=1&showinfo=0&rel=0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
				
			}

			// if (e && $(e.currentTarget).attr("data-input")) {
			// 	$(modal + ' input[name="form"]').val(
			// 		$(e.currentTarget).data("input")
			// 	);
			// }

			$.magnificPopup.open(
				{
					tClose: "Закрыть",
					removalDelay: 600,
					fixedContentPos: true,
					fixedBgPos: true,
					overflowY: "hidden",
					closeMarkup:
						'<div class="modals__close close js-close-modal"><svg class="icon icon-close close2" viewBox="0 0 612 612"><use xlink:href="/wp-content/themes/karanikola-supernova/app/icons/sprite.svg#close"></use></svg></div>',
					mainClass: "css-modal-animate",
					items: {
						src: modal,
						type: "inline",
					},
					callbacks: {
						open: () => {
							// if (
							// 	$(modal).find(button.selector).length &&
							// 	!$(modal).find(
							// 		`${button.selector} ${button.circle}`
							// 	).length
							// ) {
							// 	console.log("modal button reinit");
							// 	button.run($(modal).find(button.selector)[0]);
							// }
						},
						close: () => {
							$('.js-toggle-objects').prop('checked', false).trigger('change')
							
						},

						afterClose: () => {
							$(modal).find('.js-iframe-video').remove()
						},
					},
				},
				0
			);
		}
	},

	init: (e) => {
		$(document).on("click", ".js-close-modal", modals.close);
		$(document).on("click", ".js-modal", modals.open);


		/*$(window).on('load', function(){
			$.magnificPopup.open({
				tClose: 'Закрыть',
				removalDelay: 600,
				fixedContentPos: true,
				fixedBgPos: true,
				overflowY: 'hidden',
				closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 14 14"><use xlink:href="/app/icons/sprite.svg#close"></use></svg></div>',
				mainClass: 'css-modal-animate',
				items: {
					src: '#popup-form6',
					type: 'inline'
				},
				callbacks: {
					beforeOpen: () => {
					},

					beforeClose: () => {
					}
				}
			}, 0);
		});*/

		$(".js-img-modal").magnificPopup({
			type: "image",
			closeOnContentClick: true,
			closeBtnInside: true,
			closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close" viewBox="0 0 14 14"><use xlink:href="/wp-content/themes/karanikola-supernova/app/icons/sprite.svg#close"></use></svg></div>',
			mainClass: 'css-modal-animate',
			image: {
				verticalFit: true,
			},
			zoom: {
				enabled: false,
				duration: 500, // don't foget to change the duration also in CSS
			},
		});

	}

};


export { modals };
