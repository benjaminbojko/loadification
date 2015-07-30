(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global require */
'use strict';

var Loadification = require('loadification');

function init() {
	var loadItems = document.querySelectorAll('.load-item');

	for (var i = 0; i < loadItems.length; i++) {
		var item = loadItems[i];
		var loadification = new Loadification(item);
		console.log('Element height before load: ' + item.getBoundingClientRect().height + 'px');
		loadification.listen(handleLoad, handleError);
	}
}

function handleLoad(loadification, event) {
	console.log('Element height after load: ' + loadification.domElement.getBoundingClientRect().height + 'px');
}

function handleError(loadification, event) {
	console.log('Loadification error for load item', loadification.domElement);
}

init();

},{"loadification":2}],2:[function(require,module,exports){
/* global module */

(function(module) {
  'use strict';
  
  /**
   *
   */
  function Loadification(domElement, optTagNames) {
    this.domElement = domElement;
    this.tagNames = optTagNames || ['img', 'video'];
    this.items = [];
    this.itemsLoaded = 0;
    
    this.fnItemLoaded = null;
    this.fnItemError = null;
  }

  Loadification.prototype.listen = function(fnCompletion, fnError) {
    // clean up
    this.reset();

    // reset
    this.items = this.getItems();
    this.itemsLoaded = 0;
    
    // fire signal if no items found
    if (this.items.length === 0) {
      fnCompletion(this);
      return;
    }
    
    this.fnItemLoaded = this.getFnItemLoaded(fnCompletion);
    this.fnItemError = this.getFnItemError(fnError);

    // add listeners/check load state
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];

      if (!!item.width || !!item.height) {
        this.fnItemLoaded();
        continue;
      }
      
      item.addEventListener('error', this.fnItemError);
      
      if (item.tagName.toLowerCase() === 'video') {
        item.addEventListener('loadedmetadata', this.fnItemLoaded);
        
      } else {
        item.addEventListener('load', this.fnItemLoaded);
      }
    }
  };

  Loadification.prototype.reset = function() {
    if (this.fnItemLoaded) {
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        item.removeEventListener('loadedmetadata', this.fnItemLoaded);
        item.removeEventListener('load', this.fnItemLoaded);
        item.removeEventListener('error', this.fnItemError);
      }
    }
    
    this.fnItemLoaded = null;
    this.items = null;
    this.itemsLoaded = 0;
  };
  
  //===================================
  // Helpers
  //
  
  Loadification.prototype.getItems = function() {
    if ('querySelectorAll' in this.domElement) {
      return this.domElement.querySelectorAll(this.tagNames.join(', '));
    }
    
    var elements = [];
    
    for (var i = 0; i < this.tagNames.length; i++) {
      var tagName = this.tagNames[i];
      var elementsByTag = this.domElement.getElementsByTagName(tagName);
      
      for (var j = 0; j < elementsByTag.length; j++) {
        elements.push(elementsByTag[j]);
      }
    }
    
    return elements;
  };
  
  Loadification.prototype.getFnItemLoaded = function(fnCompletion) {
    var self = this;
    
    // Create event handler bound to self with correct callback
    return function(event) {
      self.itemsLoaded++;
      
      if (self.itemsLoaded >= self.items.length) {
        if (fnCompletion) {
          fnCompletion(self, event);
        }
        self.reset();
      }
    };
  };
  
  Loadification.prototype.getFnItemError = function(fnError) {
    var self = this;
    
    // Create event handler bound to self with correct callback
    return function(event) {
      if (fnError) {
        fnError(self, event);
      }
      self.reset();
    };
  };
  
  module.exports = Loadification;

})(module);

},{}]},{},[1]);
