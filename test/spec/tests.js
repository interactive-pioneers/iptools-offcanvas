/*jshint -W117 */

'use strict';

(function() {

  describe('IPTOffCanvas', function() {

    var config = {
      baseClass: 'offcanvas',
      closeOnClickOutside: false,
      single: true,
      static: false,
      staticCondition: function() { return true; },
      type: 'right'
    };

    var selector = 'custom';
    var object;
    var object2;
    var element;

    describe('init', function() {

      beforeEach(function() {
        object = new IPTOffCanvas(selector, config);
      });

      afterEach(function() {
        object.destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

    });

    describe('settings', function() {

      // beforeEach(function() {});

      afterEach(function() {
        object.destroy();
        if (object2) {
          object2.destroy();
        }
      });

      it('expected to close on click outside', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {closeOnClickOutside: true}));

        object.toggle(true);
        document.dispatchEvent(new Event('click'));

        return expect(object.isActive()).to.be.not.ok;
      });

      it('expected to be static', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {static: true}));

        return expect(object.isActive()).to.be.ok;
      });

      it('expected to be not static', function() {
        object = new IPTOffCanvas(
          selector,
          Object.assign({}, config, {static: true, staticCondition: function() { return false; }})
        );

        return expect(object.isActive()).to.be.not.ok;
      });

      it('expected to be single', function() {
        object = new IPTOffCanvas(selector, config);
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {type: 'bottom', single: false}));

        object2.toggle(true);
        object.toggle(true);

        return expect(object.isActive() && !object2.isActive()).to.be.ok;
      });

      it('expected not to be single', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {single: false}));
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {type: 'bottom', single: false}));

        object.toggle(true);
        object2.toggle(true);

        return expect(object.isActive() && object2.isActive()).to.be.ok;
      });

    });

    describe('events', function() {

      beforeEach(function() {
        element = document.getElementById(selector);
      });

      afterEach(function() {
        object.destroy();
        element = null;
      });

      it('expected to emit the "initialized" event', function() {
        var emitted = false;
        element.addEventListener('initialized', function() {
          emitted = true;
        });
        object = new IPTOffCanvas(selector, config);

        return expect(emitted).to.be.ok;
      });

      it('expected to emit the "opened" event', function() {
        object = new IPTOffCanvas(selector, config);
        var emitted = false;
        element.addEventListener('opened', function() {
          emitted = true;
        });
        object.toggle(true);

        return expect(emitted).to.be.ok;
      });

      it('expected to emit the "closed" event', function() {
        object = new IPTOffCanvas(selector, config);
        var emitted = false;
        element.addEventListener('closed', function() {
          emitted = true;
        });
        object.toggle(true);
        object.toggle();

        return expect(emitted).to.be.ok;
      });

    });

    describe('ui', function() {

      beforeEach(function() {
        object = new IPTOffCanvas(selector, config);
      });

      afterEach(function() {
        object.destroy();
      });

      it('expected to toggle active class', function() {
        var before = object.isActive();
        object.toggle();
        var after = object.isActive();

        return expect(before !== after).to.be.ok;
      });

      it('expected to be inactive', function() {
        object.toggle(false);

        return expect(object.isActive()).to.be.false;
      });
      //
      it('expected to be active', function() {
        object.toggle(true);

        return expect(object.isActive()).to.be.true;
      });

      it('expected to return settings', function() {
        var settings = object.getSettings();

        return expect(JSON.stringify(settings) === JSON.stringify(config)).to.be.true;
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        object = new IPTOffCanvas(selector, config);
        element = document.getElementById(selector);
      });

      afterEach(function() {
        element = null;
      });

      it('expected to remove data', function() {
        object.destroy();
        return expect(element.IPTOffCanvas).to.not.be.ok;
      });

    });

  });

})();
