import ajax from "./ajax";

var store = {

	node: {
		apartament: ".js-get-apartament",
		more: ".js-load-more",
		form: ".js-filter-form"
	},

	method:{
		changeFormID(el){
			if($(window).width() <= 700){
				$(el).attr('data-form', '#catalog-panel')
			}else{
				$(el).attr('data-form', '#desktop-filter-form')
			}
		},
		getFormFields(form){
			let fields = {};

			$(form).find("input:checkbox:checked, input[type='hidden']").each(function () {
				if ($(this).attr('type') == 'checkbox'){
					if (!fields[this.name]) fields[this.name] = [];
					fields[this.name].push($(this).val());					
				}else{
					fields[this.name] = $(this).val();
				}

			});		
			
			return fields;
		},
		filter(e){
			e.preventDefault()

			const $section = $(this).closest('section');
			const $list = $section.find('.js-post-list');
			const $button = $section.find(store.node.more);
			const $paged = $(this).find('input[name="page"]');

			$paged.val(1)

			let fields = store.method.getFormFields($(this)[0]);

			ajax.getMore(fields, (data) => {
				$list.empty().append(data.content)

				$paged.val(2)

				$button.attr('data-max', data.found)
				$button.attr('data-on-page', data.count)				

				
				// if (data.count >= data.found) 
				// console.log($list.children().length, data.found)
				if ($list.children().length >= data.found)
					$button.hide()
				else
					$button.show()
			})			


		},
		loadMore(e){
			e.preventDefault()

			const $section = $(this).closest('section');
			const $list = $section.find('.js-post-list');
			const $form = $(this).attr('data-form') ? $section.find($(this).attr('data-form')) : $section.find('form');	
			const $paged = $form.find('input[name="page"]');
			
			let page = Number($paged.val());
			const max_post = $(this).attr('data-max') ? Number($(this).attr('data-max')) : 0;
			const post_on_page = $(this).attr('data-on-page') ? Number($(this).attr('data-max')) : 0;
			// const max_pages = Math.ceil(max_post / post_on_page);

			let fields = store.method.getFormFields($form[0]);

			ajax.getMore(fields, (data) => {
				$list.append(data.content)

				page++

				$paged.val(page)


				// console.log($list.children().length, max_post)

				// if ((page - 1) >= max_pages) $(this).hide()
				if ($list.children().length >= max_post) $(this).hide()
			})

			

		},
		getApartament(e){
			e.preventDefault();

			const ID = $(this).data('id');
			const $modal = $($(this).data('modal'));

			ajax.getApartamentInfo(ID, (data) => {

				const $bg = $modal.find('.modals-apartment__preview')
				const $area = $modal.find('.modals-apartment__area-text')
				const $room = $modal.find('.modals-apartment__quantity-text')
				const $name = $modal.find('.modals-apartment__name')
				const $decoration = $modal.find('.modals-apartment__decoration')


				$bg.find('source').attr('srcset', data.image.webp)
				$bg.find('img').attr('src', data.image.default)

				$area.text(data.area)
				$room.text(data.room)
				$name.val(data.name)
				$decoration.css('display', `${data.decoration ? "flex" : "none"}`)

			})
		}
	},

	init(){
		$(document).on('click', store.node.apartament, store.method.getApartament)
		$(document).on('click', store.node.more, store.method.loadMore)

		$(store.node.form).on('submit', store.method.filter)

		const $filterButton = $('.js-district-filter-button');
		
		if ($filterButton.length){
			$filterButton.each(function(){
				store.method.changeFormID(this)
			})

			$(window).on('resize', () => {
				$filterButton.each(function () {
					store.method.changeFormID(this)
				})				
			})
		}
		
	}
}

export default store;