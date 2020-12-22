var numberInput = {
	numberWrapSelector: 'js-number-wrap',
	inputSelector: 'js-number-input',
	minusSelector: 'js-number-minus',
	plusSelector: 'js-number-plus',

	getInput: ($btn) => {
		return $btn.closest(`.${numberInput.numberWrapSelector}`)
			.find(`.${numberInput.inputSelector}`);
	},

	onMinusClick: ($minusBtn) => {
		const $input = numberInput.getInput($minusBtn);

		$input.val(Number($input.val()) > 0 ? Number($input.val()) - 1 : 0);
	},

	onPlusClick: ($plusBtn) => {
		const $input = numberInput.getInput($plusBtn);

		$input.val(Number($input.val()) + 1)
	},

	init: () => {
		const $minus = $(`.${numberInput.minusSelector}`);
		const $plus = $(`.${numberInput.plusSelector}`);

		$minus.on('click', function () {
			numberInput.onMinusClick($(this));
		});

		$plus.on('click', function () {
			numberInput.onPlusClick($(this));
		});
	}
};

export {numberInput};
