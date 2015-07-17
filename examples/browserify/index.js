var Loadification = require('loadification');

var myDomElement = document.getElementById('my-element');
var myLoadification = new Loadification(myDomElement);

myLoadification.on(Loadification.LOADED, function(){
  console.log(myDomElement.getBoundingClientRect());
});

myLoadification.start();
