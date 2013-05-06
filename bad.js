///////////////////////////////////////////////////////
// 			LAS MALAS PRÁCTICAS DE JAVASCRIPT 		 //
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
// 1. No usar una convención para los nombres
///////////////////////////////////////////////////////

// Mal
var Numero = 3

// Bien
var numero = 3

// Por qué? por que Capitalize es usualmente usado
// para los constructores
function Persona( nombre, edad, genero ){
	this.nombre = nombre
	this.edad = edad
	this.genero = genero
}
function cuadrado( numero ){
	return numero * numero
}
// para evitar ->
var persona = Persona(),
	cuatro = new cuadrado(2) //W0T!
// y que sea ->
var persona = new Persona('James', 39, 'male'),
	cuatro = cuadrado(2)


///////////////////////////////////////////////////////
// 2. No usar var
///////////////////////////////////////////////////////

// Mal
numero = 3

// Bien
var numero = 3


// Por qué? sin var se definen globales y se
// presta para generación de conflictos entre
// scripts (estés o no en un scope)



///////////////////////////////////////////////////////
// 3. Triple igual
///////////////////////////////////////////////////////

// Mal
if( variable == null )

// Bien
if( variable === null )

// Por qué? porque triple igual forza comparación
// de tipo, evitando falsos verdaderos como:

undefined == null	//true
0 == '0'			//true
0 == false			//true
' \n\n\n' == 0		//true

// mientras:

undefined === null	//false
0 === '0'			//false
0 === false			//false
' \n\n\n' === 0		//false


///////////////////////////////////////////////////////
// 4. No tener indentación (aplica a casi todos los lenguajes)
///////////////////////////////////////////////////////

// Mal
(function () {
var _super = jQuery.ajaxSettings.xhr,
xhrCorsHeaders = [ "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma" ];

jQuery.ajaxSettings.xhr = function () {
var xhr = _super(),
getAllResponseHeaders = xhr.getAllResponseHeaders;

xhr.getAllResponseHeaders = function () {
var allHeaders = "";
try {
allHeaders = getAllResponseHeaders.apply( xhr );
if ( allHeaders ) {
return allHeaders;
}
} catch ( e ) {
}

$.each( xhrCorsHeaders, function ( i, headerName ) {
if ( xhr.getResponseHeader( headerName ) ) {
allHeaders += headerName + ": " + xhr.getResponseHeader( headerName ) + "\n";
}
});
return allHeaders;
};

return xhr;
};
})();

// Mejor
(function () {
	var _super = jQuery.ajaxSettings.xhr,
		xhrCorsHeaders = [ "Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma" ];
 
	jQuery.ajaxSettings.xhr = function () {
		var xhr = _super(),
			getAllResponseHeaders = xhr.getAllResponseHeaders;
 
		xhr.getAllResponseHeaders = function () {
			var allHeaders = "";
			try {
				allHeaders = getAllResponseHeaders.apply( xhr );
				if ( allHeaders ) {
					return allHeaders;
				}
			} catch ( e ) {
			}
 
			$.each( xhrCorsHeaders, function ( i, headerName ) {
				if ( xhr.getResponseHeader( headerName ) ) {
					allHeaders += headerName + ": " + xhr.getResponseHeader( headerName ) + "\n";
				}
			});
			return allHeaders;
		};
 
		return xhr;
	};
})();

// Por qué? por legibilidad, si no es legible, 
// no lo puedes mantener

///////////////////////////////////////////////////////
// 5. No documentar (aplica a todos los lenguajes)
///////////////////////////////////////////////////////

// Mal
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;
			this.updateScrollParent(targetElement);
		}
	}
	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};

// Bien
/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};

// Por qué? contextualiza, permite entender el código y
// facilita la tarea de mantenerlo y corregir errores


///////////////////////////////////////////////////////
// 6. Usar malos nombres (aplica a todos los lenguajes)
///////////////////////////////////////////////////////

// Mal
var temp, // ok temporal...
	temp2 // otro temporal??

// Mejor
var tempMax,
	tempMin

// Usar nombres dicientes permite entender mejor el código,
// el código lo interpretan máquinas, pero lo leen humanos,
// nosotros siempre tendremos que releer nuestro código.



///////////////////////////////////////////////////////
// 7. Leer del DOM lo menos posible y reusar variables
///////////////////////////////////////////////////////

// Realmente maaaal
for(var i=0; i < $$('a').length; i++){
	if( $$('a')[i].offsetHeight < 100){ // -> <- DOM
		...
		// otro código extra
		...
		$$('a')[i].style.height = $$('a')[i].offsetHeight + 30 // -> <- DOM
		...
		// otro código extra
		...
		$$('a')[i].style.color = 'red' // -> <- DOM
		...
		// otro código extra
		...
		$$('a')[i].style.fontSize = '2rem' // -> <- DOM
	}
}

// Un poco mejor
var i = 0, 
	as = $$('a'), // oh yeah, mejor
	len = as.length, // realmente no gran cambio, pero ayuda un tris
	asStyle

for(; i < len; i++){
	// -> <- DOM en una pausa
	if( as[i].offsetHeight < 100){
		asStyle = as[i].style
		asStyle.height = as[i].offsetHeight + 30
		asStyle.color = 'red'
		asStyle.fontSize = '2rem'
		// -> <- Fin del DOM
		
		...
		// todo el código extra
		...
	}
}


// Aún mejor!
var i = 0, 
	as = $$('a'), // oh yeah, mejor
	len = as.length, // realmente no gran cambio, pero ayuda un tris
	asStyle,
	conditionsArray = []

// -> <- DOM en una pausa
for(; i < len; i++){
	conditionsArray[i] = as[i].offsetHeight < 100
	if( conditionsArray[i] ){
		asStyle = as[i].style
		asStyle.height = as[i].offsetHeight + 30
		asStyle.color = 'red'
		asStyle.fontSize = '2rem'
	}
}
// -> <- Fin del DOM

for(i = 0 ; i < len; i++){
	if( conditionsArray[i] ){
		...
		// todo el código extra
		...
	}
}