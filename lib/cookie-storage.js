(function (scope) {
  "use strict";
  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve, persist,
      kvstore = {};


    persist = function () {
      for (var key in kvstore) {
        console.debug(key);
      }
    }


    insertUpdate = function (k, v) {
      kvstore[k] = v;
      persist();
    };

    retrieve = function(k) {
      return kvstore[k];
    };

    return {
      get: retrieve,
      put: insertUpdate
    };
  }());
}(this));