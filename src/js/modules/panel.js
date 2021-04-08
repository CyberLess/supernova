var panel = {

	close: (e) => {

		// e.preventDefault();

		let $this = $(e.currentTarget),
			$container = $('html, body'),
			$panel = $this.closest('.panel');

		$panel.removeClass('is-active');
		$container.removeClass('js-lock');

	},

	open: (id) => {

		let $panel = $(`#${id}`),
			$container = $('html, body');

		$panel.addClass('is-active');
		$container.addClass('js-lock');
		
	},

	init: () => {

		$('.js-panel-close').on('click', panel.close);

		$('.js-panel-open').on('click', e => {

			let id = $(this).data('id');
			panel.open(id);

		});

	}

};

export { panel };