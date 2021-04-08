import ajax from "./ajax";

var mp = {
	items: ".js-object-map",

	map: null,

	create(el){
		let $this = $(el);

		let lat = $this.data('lat');
		let lon = $this.data('lon');

		$this.addClass('is-init')

		mp.map = new ymaps.Map(el, {
			center: [lat, lon],
			zoom: 9,
			controls: ["geolocationControl", "searchControl", "zoomControl"]
		}, {
			searchControlProvider: 'yandex#search'
		});		
	},


	newPins: () => {

		if (mp.map){
			mp.map.geoObjects.removeAll()
		}

		let objectManager = new ymaps.ObjectManager({
			// Чтобы метки начали кластеризоваться, выставляем опцию.
			clusterize: true,
			// ObjectManager принимает те же опции, что и кластеризатор.
			gridSize: 32,
			clusterDisableClickZoom: false
		})

		// Чтобы задать опции одиночным объектам и кластерам,
		// обратимся к дочерним коллекциям ObjectManager.
		objectManager.objects.options.set({
			iconLayout: 'default#image',
			iconImageHref: '/wp-content/themes/karanikola-supernova/app/img/mark2.png',
			iconImageSize: [41, 61],
			iconImageOffset: [-20, -61]
		});

		let clusterIcons = [
			{
				href: '/wp-content/themes/karanikola-supernova/app/img/cluster_small4.png',
				size: [40, 40],
				offset: [-20, -20]
			},
			{
				href: '/wp-content/themes/karanikola-supernova/app/img/cluster_big.png',
				size: [70, 70],
				offset: [-35, -35],
				shape: {
					type: 'Circle',
					coordinates: [0, 0],
					radius: 35
				}
			}],
			clusterNumbers = [100],
			MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
				'<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>'
			);

		objectManager.clusters.options.set({
			clusterIcons: clusterIcons,
			clusterNumbers: clusterNumbers,
			clusterIconContentLayout: MyIconContentLayout
		});
		mp.map.geoObjects.add(objectManager);		
		
		ajax.getMapObjects((obj) => {
			objectManager.add(obj);
		})
	},

	init(){

		if ($(mp.items).length === 0) return false;
		
		ymaps.ready(() => {
			mp.create($(mp.items)[0])
		});		

	}
}
export default mp;