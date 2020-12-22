var quiz = {
	counter: 0,
	stepSelector: '.js-quiz',
	formSelector: '.js-quiz-form',
	checkSelector: 'js-quiz-check',
	inputSelector: 'js-quiz-field',
	backSelector: '.js-quiz-back',

	pushHiddenInput: ($current, $form) => {
		let $field;
		let $result;

		if ($current.closest('label').length) {
			$field = $current.closest('label').find('input');
		} else {
			$field = $current.closest(quiz.stepSelector).find(`.${quiz.inputSelector}`);
		}

		$result = $field.clone();
		$result.attr('type', 'hidden');

		$form.append($result);
	},

	removeHiddenInput: ($clickedBack, $form) => {
		const data = $clickedBack.data('back');
		const $hiddenInput = $form.find(`input[data-back="${data}"]`);
		$hiddenInput.remove();
	},

	init: () => {
		const $form = $(quiz.formSelector);
		const $checkout = $(`.${quiz.checkSelector}`);
		const $back = $(quiz.backSelector);

		$checkout.on('click', function () {
			quiz.pushHiddenInput($(this), $form);
		});

		$back.on('click', function () {
			quiz.removeHiddenInput($(this), $form);
		});
	}
};

export { quiz };
