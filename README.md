#timedPress
A JavaScript function for measuring the length of time an element is pressed. Supports both mouse and touch events.

####Dependencies
None

####Browser Compatibility
IE10+. Currently, a single `classList` call keeps `timedPress` from IE9+.
Current versions of Chrome, FireFox, Safari and Opera.

####Params
@param {string} selector - Basic selector, #id or .class, event bubbles from.

####Returns
@returns {object} - Returns three methods:
 *  getDuration - returns last duration value
 *  registerEvents - iterates over events array and adds listener to the body for each.
 *  removeEvents - iterates over events array and removes each listener from the body.

##Usage
To invoke timedPress:
```javascript
var foo = timedPress('.class');
```
The selector can be either a `.class` or `#ID`, but must follow CSS notation.
Using touch or mouse events, press and hold the element selected.

##Retrieval
There are two ways to get the resulting data.

####Method One : Calling a Function
```javascript
var bar = foo.getDuration();
```

The method `getDuration` is one of the returned methods when calling `timedPress`. It will return the last recorded time value.

####Method Two : Event Handler
```javascript
window.addEventListener('press', function(evt){console.log(evt.data.duration)});
```

`timedPress` dispatches a `press` event every 10ms. Attached to the event is an object literal named `data`, with a `duration` property. This contains the _current_ length of time pressed.

##ToDo
* Refactor `classList` check to allow for IE9.
* configurable settings - user-definable event name, iteration time, etc.
* AMD integration - for the module-based functionality all the cool kids are doing.