import Parallax from 'parallax-js'

var par = {
	selector: ".js-parallax-scene",

	run(el){
		const parallaxInstance = new Parallax(el);

	},

	init(){
		if (!$(par.selector).length) return false;

		$(par.selector).each(function(){
			par.run(this)
		})
	}
}

export default par;