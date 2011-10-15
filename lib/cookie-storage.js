(function (scope) {
  "use strict";

  if (!scope) {
    scope = {};
  }

  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve, persist, entrySize, encode,
      kvstore = {};


    persist = function () {
      for (var key in kvstore) {
        console.debug(key);
      }
    };

    encode = function (s) {
      s = s.replace(/,/g, '%2C');
      s = s.replace(/;/g, '%3B');
      s = s.replace(/\s/g, '%20');

      return s;
    };

    /**
     * k=val
     * k.length + '='.length + kvstore[k].length
     */
    entrySize = function (k) {
      return k.length + 1 + (kvstore[k] ? kvstore[k].length : 0);
    };


    insertUpdate = function (k, v) {
      kvstore[k] = encode(v);
      persist();
    };

    retrieve = function(k) {
      return kvstore[k];
    };

    return {
      get: retrieve,
      put: insertUpdate,
      entrySize: entrySize
    };
  }());

  scope.CookieStorage.CookieManager = scope.CookieStorage.CookieManager || (function() {

  });
}(this));