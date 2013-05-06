(function(argument) {
	var deck = bespoke.from('article');
	initKeys();

	function initKeys() {
		if (/Firefox/.test(navigator.userAgent)) {
			document.addEventListener('keydown', function(e) {
				if (e.which >= 37 && e.which <= 40) {
					e.preventDefault();
				}
			});
		}

		document.addEventListener('keydown', function(e) {
			var key = e.which;

			key === 37 && deck.prev();
			(key === 32 || key === 39) && deck.next();

			// key === 38 && prevTheme();
			// key === 40 && nextTheme();
		});
	}
	function initSlideGestures() {
		var main = document.getElementById('main'),
			startPosition,
			delta,

			singleTouch = function(fn, preventDefault) {
				return function(e) {
					if (preventDefault) {
						e.preventDefault();
					}
					e.touches.length === 1 && fn(e.touches[0].pageX);
				};
			},

			touchstart = singleTouch(function(position) {
				startPosition = position;
				delta = 0;
			}),

			touchmove = singleTouch(function(position) {
				delta = position - startPosition;
			}, true),

			touchend = function() {
				if (Math.abs(delta) < 50) {
					return;
				}

				delta > 0 ? deck.prev() : deck.next();
			};

		main.addEventListener('touchstart', touchstart);
		main.addEventListener('touchmove', touchmove);
		main.addEventListener('touchend', touchend);
	}
}());