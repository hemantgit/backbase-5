/**
 * All basic functionality for backbase, including _.assign,
 * _.querystring, _.bind, _.keys, _.inherits, etc. This module is
 * heavily inspired on underscore, together with some basic utils.
 *
 * @module
 * @author    Ron Jansen <ron@flipbase.com>
 * @copyright Flipbase, 2015
 */
var utils = _ = {

  /**
   * Parse and object to UTF-8 string format so it can be used in URL's
   *
   * @method querystring
   * @param  {object} obj    object to parse
   * @param  {object} prefix name of the prefix, based on the val
   * @return {string}
   */
  querystring: function (obj, prefix) {
    var str = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        var k = prefix ? prefix + '[' + key + ']' : key;
        var val = obj[key];

        str.push(_.isObject(val) ?
          _.querystring(val, k) :
          encodeURIComponent(k) + '=' + encodeURIComponent(val));
      }
    }
    return str.join('&');
  },

  /**
   * Create a new object based on the input object
   *
   * @method clone
   * @param  {object} obj
   * @return {object}
   */
  clone: function (obj) {
    return _.assign({}, obj);
  },

  /**
   * Equivalent method to underscore's _.extend method; but this method actually
   * also deep merges nested objects!
   *
   * @method assign
   * @param  {object} target  object to copy all (sub)props to
   * @param  {object} source  object to copy all props from
   * @return {object}         target with all props from source
   */
  assign: function (target, source) {
    var keys = _.keys(source);

    _.each(keys, function (key, i, list) {
      var original = target[key];
      var next = source[key];
      if (original && next && typeof next == 'object') {
        _.assign(original, next);
      } else {
        target[key] = source[key];
      }
    });
    return target;
  },

  /**
   * Prototypal inheritance based on
   * http://javascript.crockford.com/prototypal.html
   *
   * @method inherits
   * @param  {Object}   proto   the prototype to inherit from
   * @return {Function}         the new created function with protoype
   */
  inherits: function (proto) {
    function F () {}
    F.prototype = proto;
    return new F();
  },

  /**
   * Verify if object is really an object.
   *
   * @method isObject
   * @param  {object}  obj  object to check wheter or not its an object
   * @return {Boolean}
   */
  isObject: function (obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  },

  /**
   * Verify if an object is really an array. Copied from underscore.js.
   *
   * @method isArray
   * @param  {Object}   obj   object to check whether or not its an array
   * @return {Boolean}
   */
  isArray: function (obj) {
    return toString.call(obj) === '[object Array]';
  },

  /**
   * Bind 'this' to a method
   *
   * @method bind
   * @param  {Object}   context "this"
   * @param  {Function} fn      method to bind 'this' to
   * @return {Function}         newly created method with 'this' as context
   */
  bind: function (context, fn) {
    fn = fn;
    context = context;
    return function () {
      var args = [].slice.call(arguments) || [];
      fn.apply(context, args);
    };
  },

  /**
   * Utility to prevet default actions when listening to DOM events.
   *
   * @method preventDefault
   * @param  {Object} evt event object from DOM
   */
  preventDefault: function (evt) {
    if (evt.preventDefault) {
      evt.preventDefault();
    } else if (evt.returnValue) {
      // IE8<
      evt.returnValue = false;
    }
  },

  /**
   * Get all the keys from an object literal.
   *
   * @FIXME This code does not work in IE9 and lower!
   *
   * @method keys
   * @param  {object} obj object to parse
   * @return {array}      array with all keys
   */
  keys: function (obj) {
    var props = [];
    for (var key in obj) props.push(key);

    return props;
  },

  /**
   * Iterate over array and execute callback on each index.
   *
   * @method each
   * @param  {array}    arr
   * @param  {Function} cb
   */
  each: function (arr, cb) {
    for (var i = 0; arr.length > i; i++) cb(arr[i], i, arr);
  },

  /**
   * Verify if string is a valid UUID (v1 or v4).
   *
   * @method isUUID
   * @param  {string}  uuid   string to check whether or not its an valid UUID
   * @return {Boolean}
   */
  isUUID: function (uuid) {
    var regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return regex.test(uuid);
  },

  /**
   * Verify if input is a number.
   *
   * @method isNumber
   * @param  {number}  n number
   * @return {Boolean}
   */
  isNumber: function (n) {
    return n === parseFloat(n);
  },

  /**
   * Verify if a number is even or uneven.
   *
   * @method isEven
   * @param  {number}  n number
   * @return {Boolean}   true if n=2, n=4, etc
   */
  isEven: function (n) {
    return _.isNumber(n) && (n % 2 === 0);
  },

  /**
   * Returns the index of a certain value in an array.
   *
   * @method getIndex
   * @param  {array}  arr
   * @param  {object} val
   * @param  {number} start index to start the search
   * @return {number} index of value if found; if not -1 is returned
   */
  getIndex: function (arr, val, start) {
    for (var i = (start || 0); i < arr.length; i++) {
      if (arr[i] === val) return i;
    }
    return -1;
  },

  /**
   * Shorthand to verify if value|objects are equal.
   *
   * @method eq
   * @param  {object} val1
   * @param  {object} val2
   * @return {boolean}
   */
  eq: function (val1, val2) {
    return (val1 === val2);
  },

  /**
   * Shorthand utility to check the type of an attribute.
   *
   * @method is
   * @param  {string}  attr
   * @param  {string}  type
   * @return {Boolean}
   */
  is: function (attr, type) {
    return (typeof attr === type);
  },

  /**
   * Chrome ships with their own Flash Player embedded, named 'Pepper Flash'
   * Performance with regards to Netstream methods is much lower compared to the
   * official Adobe Flash Player. If both are installed and active, Chrome still prefers
   * Pepper Flash.
   *
   * @method checkForPepper
   * @return {boolean} true if Pepper Flash is present and actived
   */
  checkForPepper: function () {
    if (navigator.mimeTypes &&
      navigator.mimeTypes['application/x-shockwave-flash'] &&
      'chrome' in window) {
      var filename = navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin.filename;

      if (filename === 'pepflashplayer.dll' ||
        filename === 'libpepflashplayer.so' ||
        filename === 'PepperFlashPlayer.plugin') {
        return true;
      }
    }
    return false;
  },

  /**
   * Check if video's can be uploaded, if XHR2 is supported
   *
   * @method hasXHR2
   * @return {Boolean}
   */
  hasXHR2: function () {
    return (window.FormData !== undefined && window.FileReader &&
      window.FileList && window.Blob) ? true : false;
  }

};

module.exports = utils;
