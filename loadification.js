/* global require, module */

(function(module) {
  'use strict';
  
  require('./util/function.bind.polyfill');
  
  var util = require('util');
  var events = require('events');
  
  /**
   *
   */
  function Loadification(domElement) {
    events.EventEmitter.apply(this);
    
    this.domElement = domElement;
    this.items = [];
    this.itemsLoaded = 0;
    this.handleItemLoaded = this.handleItemLoaded.bind(this);
  }
  
  util.inherits(Loadification, events.EventEmitter);
  
  Loadification.LOADED = 'loaded';

  Loadification.prototype.start = function() {
    var i;
    var item;
    
    // clean up
    for (i = 0; i < this.items.length; i++) {
      item = this.items[i];
      item.removeEventListener('load', this.handleItemLoaded);
      item.removeEventListener('loadedmetadata', this.handleItemLoaded);
    }

    // reset
    this.items = this.domElement.querySelectorAll('img, video');
    this.itemsLoaded = 0;
    
    // fire signal if no items found
    if (this.items.length === 0) {
      this.emit(Loadification.LOADED, this);
      return;
    }

    // add listeners/check load state
    for (i = 0; i < this.items.length; i++) {
      item = this.items[i];

      if (!!item.width || !!item.height) {
        this.handleItemLoaded();
        continue;
      }
      
      if (item.tagName.toLowerCase() === 'video') {
        item.addEventListener('loadedmetadata', this.handleItemLoaded);
        
      } else {
        item.addEventListener('load', this.handleItemLoaded);
      }
    }
  };

  Loadification.prototype.handleItemLoaded = function() {
    this.itemsLoaded++;
    
    if (this.itemsLoaded >= this.items.length) {
      this.emit(Loadification.LOADED, this);
    }
  };
  
  module.exports = Loadification;

})(module);
