# AudiogularJS

**AudiogularJS** is an audio player/controller for [AngularJS](http://angular.io).

## Dependencies

- node.js
- npm
- bower
- grunt
- angular.js
- grunt-open
- grunt-contrib-connect
- load-grunt-tasks
- grunt-babel
- grunt-contrib-concat
- grunt-contrib-watch
- karma
- grunt-karma
- jasmine-core
- karma-chrome-launcher
- protractor
 
## Installation

- Open terminal
- `cd` to the directory
- `npm install`
- `bower install`
- `grunt` *to build the project*
- Open another terminal
- `grunt serve` *to run the serve on port 9000*
- go to browser http://localhost:9000/demo/index.html *to check the demo*

## How To Use It

```html
<!-- Include the audiogularjs -->
<script src="sourceToPlugin/audiogularjs.js" type="text/javascript"></script>
```

```javascript
// Create your app with 'audiogularjs' dependency
angular.module("app", ['audiogularjs']);
```

```html
<!-- Use the audiogularjs-play directive -->
<audiogular-play src="http://sourceToAudio.m4a"></audiogular-play>
```

```css
.audiogularjs-is-stopped{
/* style for the button of play (state is stopped) */
}
.audiogularjs-is-playing{
/* style for the button of Stop (state is playing) */
}
```
