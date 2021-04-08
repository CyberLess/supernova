var map = {

	items: ['map'],

	setup: (e) => {

		let $this = $(`#${e}`);

		let lat = $this.data('lat');
		let lon = $this.data('lon');

	    var myMap = new ymaps.Map(e, {
	            center: [lat, lon],
	            zoom: 9
	        }, {
	            searchControlProvider: 'yandex#search'
	        }),


	        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
	        }, {
	            iconLayout: 'default#image',
					iconImageHref: '/wp-content/themes/karanikola-supernova/app/img/mark.png',
	            iconImageSize: [40, 58],
	            iconImageOffset: [-20, -58]
	        });


	    myMap.geoObjects
	        .add(myPlacemark)
	},

	init: () => {

		map.items.forEach((element) => {

			if(!$(`#${element}`).length)
				return;

			ymaps.ready(() => {
				map.setup(element)
			});

		})

		
	}

}

export { map };