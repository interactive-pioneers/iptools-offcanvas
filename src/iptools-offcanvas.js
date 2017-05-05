/*jshint -W040 */

(function(window, document) {
  'use strict';

  var dataAttr = {
    open: 'offcanvas-open',
    close: 'offcanvas-close',
    toggle: 'offcanvas-toggle'
  };

  var alwaysTrue = function() {
    return true;
  };

  var defaults = {
    baseClass: 'offcanvas',
    closeOnClickOutside: false,
    single: true,
    static: false,
    staticCondition: alwaysTrue,
    type: 'right'
  };

  var types = {
    top: {
      baseClass: '--top',
      activeClass: '--top--active'
    },
    right: {
      baseClass: '--right',
      activeClass: '--right--active'
    },
    bottom: {
      baseClass: '--bottom',
      activeClass: '--bottom--active'
    },
    left: {
      baseClass: '--left',
      activeClass: '--left--active'
    },
  };

  var modifiers = {
    initialized: '--initialized'
  };

  function _handleDocumentClick(event) {
    if (!(event.target === this.element || this.element.contains(event.target))) {
      this.toggle(false);
    }
  }

  function _bindCloseOnClickOutsideEvents() {
    if (this.settings.closeOnClickOutside && !this.settings.static) {
      document.addEventListener('click', this.documentHandler);
    }
  }

  function _unbindCloseOnClickOutsideEvents() {
    document.removeEventListener('click', this.documentHandler);
  }

  function _initialize() {
    if (this.settings.static && this.settings.staticCondition()) {
      this.element.dispatchEvent(new Event('open'));
    }

    this.element.classList.add(this.settings.baseClass + modifiers.initialized);
  }

  function _open(event) {
    event.target.IPTOffCanvas.toggle(true);
    event.stopPropagation();
  }

  function _close(event) {
    event.target.IPTOffCanvas.toggle(false);
    event.stopPropagation();
  }

  function _toggle(event) {
    event.target.IPTOffCanvas.toggle();
    event.stopPropagation();
  }

  function _addEventListeners() {
    var self = this;

    this.element.IPTOffCanvas = self;
    this.element.addEventListener('open', _open);
    this.element.addEventListener('close', _close);
    this.element.addEventListener('toggle', _toggle);

    this.openNodes.forEach(function(elem) {
      elem.IPTOffCanvas = self;
      elem.addEventListener('click', _open);
    });

    this.closeNodes.forEach(function(elem) {
      elem.IPTOffCanvas = self;
      elem.addEventListener('click', _close);
    });

    this.toggleNodes.forEach(function(elem) {
      elem.IPTOffCanvas = self;
      elem.addEventListener('click', _toggle);
    });
  }

  function IPTOffCanvas(selector, options) {
    this.settings = Object.assign({}, defaults, options);

    this.element = document.getElementById(selector);

    this.initializeHandler = _initialize.bind(this);
    this.addEventHandler = _addEventListeners.bind(this);
    this.documentHandler = _handleDocumentClick.bind(this);
    this.bindDocHandler = _bindCloseOnClickOutsideEvents.bind(this);
    this.unbindDocHandler = _unbindCloseOnClickOutsideEvents.bind(this);

    this.openNodes = document.querySelectorAll('[data-' + dataAttr.open + '="' + selector + '"]');
    this.closeNodes = document.querySelectorAll('[data-' + dataAttr.close + '="' + selector + '"]');
    this.toggleNodes = document.querySelectorAll('[data-' + dataAttr.toggle + '="' + selector + '"]');

    this.element.classList.add(this.settings.baseClass + types[this.settings.type].baseClass);

    this.addEventHandler();
    this.initializeHandler();
  }

  IPTOffCanvas.prototype.getSettings = function() {
    return this.settings;
  };

  IPTOffCanvas.prototype.isActive = function() {
    return this.element.classList.contains(this.settings.baseClass + types[this.settings.type].activeClass);
  };

  IPTOffCanvas.prototype.toggle = function(open) {
    var activeTypeClass = this.settings.baseClass + types[this.settings.type].activeClass;
    var offcanvasInstance;
    var offcanvasSettings;
    var self = this;

    if (typeof open === 'undefined') {
      open = !this.isActive();
    }

    // close other instances
    if (this.settings.single && open) {
      document.querySelectorAll('.' + this.settings.baseClass + modifiers.initialized).forEach(function(elem) {
        offcanvasInstance = elem.IPTOffCanvas;
        offcanvasSettings = offcanvasInstance.getSettings();
        if (
          self.element !== offcanvasInstance.element &&
          offcanvasInstance.isActive() &&
          !(offcanvasSettings.static && offcanvasSettings.staticCondition())
        ) {
          offcanvasInstance.toggle(false);
        }
      });
    }

    var eventName = '';
    if (open && !this.isActive()) {
      eventName = 'opened';
      this.bindDocHandler();
    } else if (!open && this.isActive()) {
      eventName = 'closed';
      this.unbindDocHandler();
    }

    if (eventName !== '') {
      // this.element.dispatchEvent(new CustomEvent(eventName));
      var eventObj = document.createEvent('CustomEvent');
      eventObj.initEvent(eventName, true, true);
      this.element.dispatchEvent(eventObj);
    }

    this.element.classList.toggle(activeTypeClass, open);
  };

  IPTOffCanvas.prototype.destroy = function() {
    delete(this.element.IPTOffCanvas);

    this.element.removeEventListener('open', _open);
    this.element.removeEventListener('close', _close);
    this.element.removeEventListener('toggle', _toggle);
    this.element.classList.remove(this.settings.baseClass + modifiers.initialized);
    this.element.classList.remove(this.settings.baseClass + types[this.settings.type].activeClass);

    this.openNodes.forEach(function(elem) {
      delete(elem.IPTOffCanvas);
      elem.removeEventListener('click', _open);
    });

    this.closeNodes.forEach(function(elem) {
      delete(elem.IPTOffCanvas);
      elem.removeEventListener('click', _close);
    });

    this.toggleNodes.forEach(function(elem) {
      delete(elem.IPTOffCanvas);
      elem.removeEventListener('click', _toggle);
    });
  };

  window.IPTOffCanvas = IPTOffCanvas;

})(window, document);
