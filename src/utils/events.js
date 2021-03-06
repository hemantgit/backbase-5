/**
 * Lightweight DOM event listeners module
 * 
 * @category helpers
 * @module
 */

var events = {};

/**
 * For IE9 and addEventListener you need an HTML5 <!DOCTYPE html>
 * Below code is proposed by John Resig (source: 
 * http://ejohn.org/projects/flexible-javascript-events/).
 *
 * @memberOf  events
 * @method  on
 * @param  {object} el stored reference to the element
 * @param  {string} evt
 * @param  {function} handler
 */
events.on = function (el, evnt, fn) {
  if (el.attachEvent) {
    // This creates the method is a child of the element, instead of the
    // document as a whole. 'this' now refers to the element properly.
    el['e' + evnt + fn] = fn;
    el[evnt + fn] = function(){ el['e' + evnt + fn](window.event); };
    el.attachEvent('on' + evnt, el[evnt + fn]);
  } else {
    el.addEventListener(evnt, fn, false);
  }
};

/**
 * Remove eventslisteners. 
 * 
 * @param  {object}   el   reference to the element
 * @param  {string}   evnt
 * @param  {function} fn
 */
events.off = function (el, evnt, fn) {
  if (el.detachEvent) {
    el.detachEvent('on' + evnt, el[evnt + fn]);
    el[evnt + fn] = null;
  } else {
    el.removeEventListener(evnt, fn, false);
  }
};

export default events;