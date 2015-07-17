# loadification

Standalone JS script to notify when images or videos are loaded within an element.

## Usage

```js
var Loadification = require('loadification');

var myDomElement = document.getElementById('my-element');
var myLoadification = new Loadification(myDomElement);
myLoadification.on(Loadification.LOADED, function(){
	console.log(myDomElement.getBoundingClientRect());
});
myLoadification.start();
```

## Requirements

Depends on `Element.querySelectorAll()` support (or polyfill).

If you're targeting IE8+ you should be fine, otherwise there are additional libraries out there:

* https://github.com/inexorabletash/polyfill
* https://github.com/termi/CSS_selector_engine
