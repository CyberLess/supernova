import { config } from "../config";
import anime from 'animejs/lib/anime.es.js';

// import {TimelineMax, Power0, TweenLite} from 'gsap';
// import "../vendors/MorphSVGPlugin";



var lines = {

	init: () => {
		$('.back-line').each((i, el) => {

			let $this = $(el),
				$circle = $this.find('.back-line__circle'),
				$path = $this.find('path');

				var path = anime.path($path[0]);

				anime({
					targets: $circle[0],
					translateX: path('x'),
					translateY: path('y'),
					delay: anime.stagger(10, {from: config.getRandomInt(10, 100)}),
					easing: 'linear',
					duration: 20000,
					loop: true
				});
			// lines.run($circle, $path);

		})
	}

	// run: () => {
	// 	let circle = $($circle)[0];
	// 	let path = $($path)[0];

	// 	var bezierData = MorphSVGPlugin.pathDataToBezier(path);
	// 	TweenMax.to(circle, 2, {bezier: {values:bezierData, type:"cubic"}, ease:Linear.easeNone, repeat:-1, yoyo:true});
	
	// },

	// init: () => {
	// 	$('.back-line').each((i, el) => {

	// 		let $this = $(el),
	// 			$circle = $this.find('circle'),
	// 			$path = $this.find('path');

	// 		lines.run($circle, $path);

	// 	})
	// }

}

// var lines = {

// 	maketl: (a, circle, start_x, start_y, ease) => {

// 		var tl = new TimelineMax({repeat: -1, yoyo: true});

// 		for (let i = 0; i < a.length + 1 ; i++) {

// 			if (i === 0) {

// 				tl.set(circle, { attr: { cx: start_x, cy: start_y } });

// 			}else {

// 				var item = a[i];
// 				if (!item) return;

// 				let x = item[0];
// 				let y = item[1];

// 				tl.to(circle,.5, { ease, attr: { cx: x, cy: y }});

// 			}

// 		}
		
// 		return tl;

// 	},

// 	run: ($circle, $path) => {

// 		let circle = $($circle)[0];
// 		let path = $($path)[0];

// 		let ease = Power0.easeNone;

// 		let points = path.getAttribute('d');

// 		config.log('points', points)

// 		let arr = points.split(" ").map(x=> x.replace(/[A-Za-z]/, "")).map(x => x.split(",")).filter(x=>x.length === 2);

// 		config.log('arr', arr)

// 		let start_x = arr[0][0];
// 		let start_y = arr[0][1];

// 		let t = lines.maketl(arr, circle, start_x, start_y, ease);

// 	},

// 	init: () => {

// 		$('.back-line').each((i, el) => {

// 			let $this = $(el),
// 				$circle = $this.find('circle'),
// 				$path = $this.find('path');

// 			lines.run($circle, $path);

// 		})

// 	} 

// };

export { lines };