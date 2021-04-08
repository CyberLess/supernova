import store from "./store";

var ajax = {
	accept: true,
	$preloader: $('.js-preloader-screen'),

	getApartamentInfo(id, callback){

		let data = {
			action: "get_apartament_info",
			product_id: id
		};

		ajax.send(data, (response) => {
			let json = JSON.parse(response);

			if (typeof callback === "function") {
				callback(json);
			}
		});		
	},

	getMore(params, callback){
		ajax.send(params, (response) => {
			let json = JSON.parse(response);

			if (typeof callback === "function") {
				callback(json);
			}
		});	

	},

	getMapObjects(callback){

		const $filterButton = $('.js-district-filter-button');
		const form = $filterButton.attr('data-form') ? $($filterButton.attr('data-form'))[0] : $('.js-filter-form')[0];	

		let fields = store.method.getFormFields(form);

		fields['action'] = "get_map_objects";

		console.log("map form fields", fields, form)

		ajax.send(fields, (response) => {
			let json = JSON.parse(response);

			if (typeof callback === "function") {
				callback(json);
			}
		});	
	},

	send: (params, callback, error_callback) => {

		if (!ajax.accept) return false;

		ajax.accept = false;

		ajax.$preloader.css('display', 'flex')

		$.ajax({
			type: "post",
			url: myajax.url,
			data: params,
			success: function (response) {

				ajax.$preloader.fadeOut(150, () => {
					ajax.accept = true;
				
					if (typeof callback === "function") {
						callback(response);
					}					
				})

			},
			error: function (jqXHR, textStatus, errorThrown) {

				ajax.$preloader.fadeOut(150, () => {
					ajax.accept = true;

					if (typeof error_callback === "function") {
						error_callback(jqXHR, textStatus, errorThrown);
					}
				})
			}
		});
	},	
}

export default ajax