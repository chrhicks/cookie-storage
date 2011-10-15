(function (scope) {
  "use strict";

  if (!scope) {
    scope = {};
  }

  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve, persist, entrySize, encode,
      CookieManager,
      kvstore = {},

    CookieManager = (function() {
      var set, get, remove, isSet, encode;

      encode = function (s) {
        s = s.replace(/,/g, '%2C');
        s = s.replace(/;/g, '%3B');
        s = s.replace(/\s/g, '%20');

        return s;
      };

      isSet = function (name) {
        return (new RegExp("(?:^|;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      };

      set = function (name, value) {
        document.cookie = escape(name) + "=" + encode(value) + ";path=/";
      };

      get = function (name) {
        if (!isSet(name)) { return null; }
        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
      };

      remove = function (name) {
        var oExpDate = new Date();
        oExpDate.setDate(oExpDate.getDate() - 1);
        document.cookie = escape(name) + "=expired;expires=" + oExpDate.toGMTString() + ";path=/";
      };

      return {
        set: set,
        get: get,
        remove: remove,
        isSet: isSet,
        encode: encode
      }

    }());


    persist = function () {
      for (var key in kvstore) {
        console.debug(key);
      }
    };

    /**
     * k=val
     * k.length + '='.length + kvstore[k].length
     */
    entrySize = function (k) {
      return k.length + 1 + (kvstore[k] ? CookieManager.encode(kvstore[k]).length : 0);
    };


    insertUpdate = function (k, v) {
      kvstore[k] = v;
      persist();
    };

    retrieve = function(k) {
      return kvstore[k];
    };

    return {
      CookieManager: CookieManager,
      get: retrieve,
      put: insertUpdate,
      entrySize: entrySize
    };
  }());


}(this));