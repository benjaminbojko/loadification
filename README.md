# loadification

Standalone JS script to notify when images or videos are loaded within an element.

## Usage

```js
var Loadification = require('loadification');

var myDomElement = document.getElementById('my-element');
var myLoadification = new Loadification(myDomElement);

myLoadification.listen(function(loadification){
	console.log(loadification.domElement.getBoundingClientRect());
}, function(loadification, errorEvent){
	console.log('Loadification error :(');
});
```
