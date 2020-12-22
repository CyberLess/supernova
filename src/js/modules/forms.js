import Inputmask from "inputmask";
import validate from 'jquery-validation';
import { panel } from "./panel";
import { config } from "../config";
import 'magnific-popup';

var forms = {

	mask: () => {
		var selector = document.querySelectorAll("input[name='phone']");

		var im = new Inputmask({
			"mask": "+7 (999) 999-99-99",
			clearMaskOnLostFocus: true,
			clearIncomplete: false
		});

		im.mask(selector);
	},

	multiply:  {

		toggle: ($item) => {

			let ww = $(window).width();

			let $another = $('.js-multiply').not($item);

			forms.multiply.close($another);

			if(ww <= 580){
				panel.open($item.data('panel'))
			}else{
				$item.toggleClass('is-active');
			}

		},

		open: ($item) => {

			let ww = $(window).width();

			if(ww <= 580){
				panel.open($item.data('panel'))
			}else{
				$item.addClass('is-active')
			}

		},

		close: ($item) => {

			$item.removeClass('is-active')

		},

	},

	validate: () => {
		$("form").each((i, el) => {
			var $form = $(el);

			$form.validate({
				errorPlacement: function(error, element) {
					//just nothing, empty
				},
				highlight: (element, errorClass, validClass) => {
					$(element).parent().addClass(errorClass).removeClass(validClass);
				},
				unhighlight: (element, errorClass, validClass) => {
					$(element).parent().removeClass(errorClass).addClass(validClass);
				},
				submitHandler: (form) => {

					var data = $(form).serialize();

					$.ajax({
						type: 'POST',
						url: $(form).attr('action'),
						data: data,
						success: function(data) {
							$(form)[0].reset();
							$(form).find('label').removeClass('valid');
							console.log(data);
							$.magnificPopup.close();
						}
					});

				},
				rules: {
					phone:{
						required: true,
						minlength: 10,
					},
				}
			})

		})
	},

	events: () => {
		$('.input__field')
			.on('focus', (e)=>{
				let $input = $(e.target)
				$input.parent().addClass('is-focus')
			})
			.on('blur change', (e)=>{
				let $input = $(e.target)

				if($input.val() == '')
					$input.parent().removeClass('is-focus')
		 	})
	},

	changeSubj: (e) => {

		let text = $(e.currentTarget).text();

		$(e.currentTarget).closest('form').find('.js-subj-input').val(text);

	},

	toggleEmail: (e) => {

		let text = $(e.currentTarget).val();

		if ( text == 'E-mail' ) {
			$(e.currentTarget).closest('form').find('.js-email').slideDown(300);
		} else {
			$(e.currentTarget).closest('form').find('.js-email').slideUp(300);
		}

	},

	file: (e) => {
		let filename = $(e.currentTarget).val().replace(/.*(\/|\\)/, '');

		$(e.currentTarget).closest('.js-file').find('.js-file-text').html( '<span class="file__name">' + filename + '</span><span  class="file__link">Изменить</span> ' )
	},

	init: () => {

		forms.mask();
		forms.validate();
		forms.events();

		$('.js-multiply-nav').on('click', e => {
			let $parent = $(e.currentTarget).closest('.js-multiply');
			forms.multiply.toggle($parent);
		})

		$(document).mouseup(function(e) {
			var container = $(".js-multiply");

			if (!container.is(e.target) && container.has(e.target).length === 0) {
				forms.multiply.close(container);
			}
		});

		$(document).on('click', '.js-subj-btn', forms.changeSubj);

		$(document).on('change', '.js-show-email', forms.toggleEmail);

		$(document).on('change', '.js-file-input', forms.file);

		/*$('.field__input').blur(function(){
			if( $(this).val().length > 0 ) {
				$(this).parent().addClass('is-complete');
			}
		});*/

	}

}

export {forms};
