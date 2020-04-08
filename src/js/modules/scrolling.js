import AOS from 'aos';

var scrolling = {

	run: () => {
		AOS.init({
			duration: 200,
			offset: 100,
			once: true,
			disable: () => {
				let maxWidth = 1025;
				return window.innerWidth < maxWidth;
			}
		});		
	},

	init: () => {

		if(window.innerWidth < 1025)
			scrolling.run()

		$(window).on('load', () => {
			if(window.innerWidth > 1025)
				setTimeout(scrolling.run, 100)
		})

	}

}

export { scrolling };