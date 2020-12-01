var ray = {
	containerSelector: '.js-ray',
	hvrElemSelector: '.js-ray-hover',

	onExpertHover: ($container, $experts, $currentElem) => {
		$container.addClass('hover');
		$experts.not($currentElem).addClass('darken').removeClass('no-darken');
	},

	onExpertBlur: ($container, $experts, $currentElem) => {
		$container.removeClass('hover');
		$experts.not($currentElem).removeClass('darken').addClass('no-darken');
	},

	init: () => {
		const $container = $(ray.containerSelector);
		const $expert = $container.find(ray.hvrElemSelector);

		$expert.on('mouseenter', function () {
			ray.onExpertHover($container, $expert, $(this));
		});

		$expert.on('mouseleave', function () {
			ray.onExpertBlur($container, $expert, $(this));
		});
	}
};

export {ray};
