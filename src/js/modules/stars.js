import "canvallax";
import { config } from "../config";

// var myCanvallax = Canvallax({ damping: 20 });

var stars = {


	init: () => {



		var myCanvallax = Canvallax({ damping: 10 }),
		    width = document.body.clientWidth,
		    height = document.body.clientHeight;
		var stars = [],
		    number = 250,
		    i = 0,
		    distance;

		for (; i < number; i++) {
		  distance = config.getRandomRange(0.25,0.9);
		  stars.push(
		    Canvallax.Circle({
		      x: Math.random() * width * (2 - distance),
		      y: Math.random() * height * (2 - distance),
		      distance: distance,
		      size: 2,
		      fill: '#FFF'
		    })
		  );
		}

		myCanvallax.add(stars);


		// v 2.0.0
		// var scene = canvallax.Scene(),
		// 	width = document.body.clientWidth,
		// 	height = document.body.clientHeight,
		// 	tracker = canvallax.TrackScroll();

		// scene.addTo(tracker);

		// var stars = canvallax.Group(),
		// 	number = 400,
		// 	i = 0,
		// 	distance;

		// for (; i < number; i++) {
		// 	distance = config.getRandomRange(0.25,0.9);
		// 		stars.push(
		// 			canvallax.Ellipse({
		// 			width: 6,
		// 			height: 6,
		// 			x: Math.random() * width * (2 - distance),
		// 			y: Math.random() * height * (2 - distance),
		// 			z: distance,
		// 			fill: '#fff'
		// 		})
		// 	);
		// }

		// scene.add(stars);

	}

}


export { stars }