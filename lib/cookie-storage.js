(function (scope) {
  "use strict";
  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve;

    insertUpdate = function (k, v) {

    };

    retrieve = function(k) {

    };

    return {
      get: retrieve,
      put: insertUpdate
    };
  }());
}(this));