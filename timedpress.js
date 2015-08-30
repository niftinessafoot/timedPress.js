function timedPress(selector) {
/**
 * Dispatches a custom event with a `data.dispatch` object indicating in milliseconds how long the specified element has been pressed.
 * @param {string} selector - Basic selector, #id or .class, event bubbles from.
 *
 * @returns {object} - Returns three methods:
 *  getDuration - returns last duration value
 *  registerEvents - iterates over events array and adds listener to the body for each.
 *  removeEvents - iterates over events array and removes each listener from the body.
 */
'use strict';
  var events = ['mouseup','mousedown','mouseout','touchstart','touchend'],
    body = document.body,
    duration = 0,
    callback;

  function init(){
    callback = registerCallback(selector);
    registerEvents();
  }

  function registerEvents(){
    events.forEach(function(item){
      body.addEventListener(item, callback);
    });
  }

  function removeEvents(){
    events.forEach(function(item){
      body.removeEventListener(item, callback);
    });
  }

  function getDuration(){
    return duration;
  }

  function registerCallback(ele){
    var isID = ele.charAt(0) === '#',
      sel = ele.substr(1),
      broadcastEvent = new Event('press',{"bubbles":true, "cancelable":true}),
      isActive = false,
      intervalStart,
      intervalEnd,
      timeStampStart,
      target;


    function query(ele){
      return isID ? (ele.id === sel) : (ele.classList.contains(sel));
    }

    function report(){
      var timeStampEnd = new Date().getTime();
      duration = timeStampEnd - timeStampStart;
      broadcastEvent.data = {duration : duration};
      target.dispatchEvent(broadcastEvent);
    }

    function handleEvent(evt){
      if(query(evt.target)){
        target = evt.target;

        switch(evt.type){
          case 'mousedown':
          case 'touchstart':
          timeStampStart = new Date().getTime();
          intervalStart = setInterval(report, 10);
          isActive = true;
          break;

          case 'mouseup':
          case 'mouseout':
          case 'touchend':
          if(isActive){
            intervalEnd = clearInterval(intervalStart);
            isActive = false;
          }
          break;
        }
      }
    }
    return {handleEvent : handleEvent};
  }

  init();
  return {
    getDuration : getDuration,
    registerEvents : registerEvents,
    removeEvents : removeEvents
  };
}