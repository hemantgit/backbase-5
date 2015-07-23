/**
 * 
 * @module
 */

export function validUUID(id) {
  return ((id.length > 31) && id.search(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/));
}

export function isNumber(n) {
  return n === parseFloat(n);
}

export function isEven(n) {
  return isNumber(n) && (n % 2 === 0);
}

export function bind(context, fn) {
  fn = fn;
  context = context;
  return function () {
    var args = [].slice.call(arguments) || [];
    fn.apply(context, args);
  };
}

export function querystring (obj) {
  var keys = Object.keys(obj);
  var querystring = '';

  keys.forEach(function (key) {
    var val = obj[key];
  
    if (querystring.length > 0) querystring += '&amp;';
  
     querystring += key + '=' + val; 
  });

  return querystring;
}


export function hasXHR2() {
  return (window.FormData !== undefined && window.FileReader &&
    window.FileList && window.Blob) ? true : false;
}

/**
 * Chrome ships with their own Flash Player embedded, named 'Pepper Flash'
 * Performance with regards to Netstream methods is much lower compared to the
 * official Adobe Flash Player. If both are installed and active, Chrome still prefers
 * Pepper Flash.
 * @return {boolean} true if Pepper Flash is present and actived
 */
export function checkForPepper() {
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
}