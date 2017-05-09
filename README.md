# iptools-offcanvas [![Build Status](https://api.travis-ci.org/interactive-pioneers/iptools-offcanvas.svg)](https://travis-ci.org/interactive-pioneers/iptools-offcanvas) [![npm version](https://badge.fury.io/js/iptools-offcanvas.svg)](https://badge.fury.io/js/iptools-offcanvas)

Simple lightweight (5k) native js css3 animated offcanvas.

Displays content inside an offcanvas from the `top`, `right`, `bottom` or `left`.

Distribution includes a polyfill for Object.assign.

## Related

- [jQuery version](https://github.com/interactive-pioneers/iptools-jquery-offcanvas)

## Features / Options

All options are optional.

Name                   | type       | default value                 | values                                     | description
:----------------------|:-----------|:------------------------------|:-------------------------------------------|:-----------------------------------
`baseClass`            | `string`   | `offcanvas`                   | valid css class string                     | base css class
`type`                 | `string`   | `left`                        | `top`, `right`, `bottom`, `left`           | canvas position
`single`               | `boolean`  | `true`                        |                                            | single mode, closes all other canvases
`closeOnClickOutside`  | `boolean`  | `false`                       |                                            | close canvas on click outside
`static`               | `boolean`  | `false`                       |                                            | open after initialization
`staticCloseCondition` | `function` | `function() { return true; }` | a function returning either true or false  | close condition for static canvas

## Methods

Method        | Parameter | Return    | Description
:-------------|:----------|:----------|:-----------
`getSettings` |           | `object`  | retrieve settings
`isActive`    |           | `boolean` | returns if canvas is active (open)
`toggle`      | `boolean` |           | not required. open (true), close (false) or toggle (leave empty)
`destroy`     |           |           | destroy offcanvas

## Events

Event         | Description
:-------------|:-----------
`initialized` | Emitted when canvas is ready to use.
`opened`      | Emitted when the canvas opens.
`closed`      | Emitted when the canvas closes.

## Example

```html
<button data-offcanvas-open="custom">open</button>
<button data-offcanvas-close="custom">close</button>
<button data-offcanvas-toggle="custom">toggle</button>

<section id="custom" class="offcanvas" style="padding:50px;background-color:rgba(0,0,0,0.5);">
  <p>content</p>
  <button data-offcanvas-close="custom">X</button>
</section>

<link rel="stylesheet" href="dist/iptools-offcanvas.css" type="text/css">
<script src="dist/iptools-offcanvas.min.js"></script>
<script type="text/javascript">

  // initialize
  var mine = new IPTOffCanvas('custom', {
    baseClass: 'offcanvas',
    closeOnClickOutside: false,
    single: true,
    static: false,
    staticCloseCondition: function() { return true; },
    type: 'right'
  });

  // retrieve settings
  var settings = mine.getSettings();

  // check if active (open)
  var isActive = mine.isActive();

  // open, close or toggle
  mine.toggle(true); // true for open, false to close, leave empty to toggle

  // destroy canvas
  mine.destroy();
  delete(mine);

  // example event listener
  document.getElementById('custom').addEventListener('opened', function() {
    console.log('canvas opened');
  });

</script>
```

## Licence

Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
