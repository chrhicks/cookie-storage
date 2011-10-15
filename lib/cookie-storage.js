(function (scope) {
  "use strict";
  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve,
      kvstore = {};


    insertUpdate = function (k, v) {
      kvstore[k] = v;
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