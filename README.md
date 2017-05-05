# iptools-offcanvas [![Build Status](https://api.travis-ci.org/interactive-pioneers/iptools-offcanvas.svg)](https://travis-ci.org/interactive-pioneers/iptools-tooltip)

Simple CSS3 animated offcanvas.

## Features

- Displays content inside an offcanvas from the top, right, bottom or left.
- Multiple instances at once.
- Static, instance is open on page load.
- Single mode closes all other off canvas instances when opening.
- CSS3 transitions and animations.

## Options

All options are optional.

Name                 | type     | default value               | values                                     | description
:--------------------|:---------|:----------------------------|:-------------------------------------------|:-----------------------------------
baseClass            | string   | offcanvas                   | valid css class string                     | base css class
type                 | string   | left                        | top, right, bottom, left                   | canvas position
single               | boolean  | true                        |                                            | single mode, closes all other instances
closeOnClickOutside  | boolean  | false                       |                                            | close canvas on click outside
static               | boolean  | false                       |                                            | open after initialization
staticCondition      | function | function() { return true; } | a function returning either true or false  | close condition for static canvas

## Events

Event        | Element        | Description
:------------|:---------------|:-----------
opened       | element        | Emitted when the canvas opens.
closed       | element        | Emitted when the canvas closes.

## Requirements

- none

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
    staticCondition: function() { return true; },
    type: 'right'
  });

  // example event listener
  document.getElementById('custom').addEventListener('opened', function() {
    console.log('canvas opened');
  });

</script>
```

## Contributions

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-offcanvas/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-offcanvas/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Install dependencies (`npm i`)
4. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch` listens to source, live reloads browser
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence

Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
