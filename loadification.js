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
    var items = this.items;
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

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
