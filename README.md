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
- karma-phantomjs-launcher
- protractor
 
## Installation

- Open terminal
- `cd` to the directory
- `npm install`
- `bower install`
- `grunt` *to build the project and start the server and open the browser*
- `grunt unit` *for unit test*
- `grunt e2e` *for end to end test*

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
