/*jshint -W117 */

'use strict';

(function() {

  describe('IPTOffCanvas', function() {

    var config = {
      baseClass: 'offcanvas',
      closeOnClickOutside: false,
      single: true,
      static: false,
      staticCloseCondition: function() { return true; },
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

    describe('ui', function() {

      beforeEach(function() {
        object = new IPTOffCanvas(selector, config);
      });

      afterEach(function() {
        object.destroy();
      });

      it('expected object to be active', function() {
        object.toggle(true);

        return expect(object.isActive()).to.be.true;
      });

      it('expected object to be not active', function() {
        return expect(object.isActive()).to.be.not.true;
      });

      it('expected object to toggle', function() {
        var before = object.isActive();
        object.toggle();
        var after = object.isActive();

        return expect(before !== after).to.be.ok;
      });

      it('expected object to open', function() {
        object.toggle(true);

        return expect(object.isActive()).to.be.true;
      });

      it('expected object to close', function() {
        object.toggle(false);

        return expect(object.isActive()).to.be.false;
      });

      it('expected object settings', function() {
        var settings = object.getSettings();

        return expect(JSON.stringify(settings) === JSON.stringify(config)).to.be.true;
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

      it('expected object to close on click outside', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {closeOnClickOutside: true}));

        object.toggle(true);
        document.dispatchEvent(new Event('click'));

        return expect(object.isActive()).to.be.not.ok;
      });

      it('expected object to be static', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {static: true}));

        return expect(object.isActive()).to.be.ok;
      });

      it('expected object2 static to close when object single opens', function() {
        object = new IPTOffCanvas(selector, config);
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {static: true, type: 'bottom'}));

        object.toggle(true);

        return expect(object2.isActive()).to.be.not.ok;
      });

      it('expected object2 static to not close when object single opens', function() {
        object = new IPTOffCanvas(selector, config);
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {
          static: true,
          staticCloseCondition: function() { return false; },
          type: 'bottom'
        }));

        object.toggle(true);

        return expect(object2.isActive()).to.be.ok;
      });

      it('expected object to be single', function() {
        object = new IPTOffCanvas(selector, config);
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {type: 'bottom', single: false}));

        object2.toggle(true);
        object.toggle(true);

        return expect(object.isActive() && object2.isActive()).to.be.not.ok;
      });

      it('expected object not to be single', function() {
        object = new IPTOffCanvas(selector, Object.assign({}, config, {single: false}));
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {type: 'bottom', single: false}));

        object.toggle(true);
        object2.toggle(true);

        return expect(object.isActive() && object2.isActive()).to.be.ok;
      });

      it('expected two object single at once', function() {
        object = new IPTOffCanvas(selector, config);
        object2 = new IPTOffCanvas('custom2', Object.assign({}, config, {type: 'bottom'}));

        object.toggle(true);
        object2.toggle(true);
        var first = !object.isActive() && object2.isActive();

        object.toggle(true);
        var second = object.isActive() && !object2.isActive();

        return expect(first && second).to.be.ok;
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

      it('expected object to emit the "initialized" event', function() {
        var emitted = false;
        element.addEventListener('initialized', function() {
          emitted = true;
        });
        object = new IPTOffCanvas(selector, config);

        return expect(emitted).to.be.ok;
      });

      it('expected object to emit the "opened" event', function() {
        object = new IPTOffCanvas(selector, config);
        var emitted = false;
        element.addEventListener('opened', function() {
          emitted = true;
        });
        object.toggle(true);

        return expect(emitted).to.be.ok;
      });

      it('expected object to emit the "closed" event', function() {
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

    describe('destroy', function() {

      beforeEach(function() {
        object = new IPTOffCanvas(selector, config);
        element = document.getElementById(selector);
      });

      afterEach(function() {
        element = null;
      });

      it('expected object to remove data', function() {
        object.destroy();
        return expect(element.IPTOffCanvas).to.not.be.ok;
      });

    });

  });

})();
