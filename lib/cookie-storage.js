(function (scope) {
  "use strict";

  if (!scope) {
    scope = {};
  }

  scope.CookieStorage = scope.CookieStorage || (function() {
    var insertUpdate, retrieve, persist, entrySize, cookieSize, encode,
      CookieManager,

      kvstore = {},

      COOKIE_PREFIX = 'cskv_',

      MAX_COOKIE_LENGTH = 4096;

    CookieManager = (function() {
      var set, get, remove, isSet, encode;

      encode = function (s) {
        s = s.replace(/,/g, '%2C');
        s = s.replace(/;/g, '%3B');
        s = s.replace(/\s/g, '%20');
        s = s.replace(/\|/g, '%7C');

        return s;
      };

      isSet = function (name) {
        return (new RegExp("(?:^|;\\s*)" + escape(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      };

      set = function (name, value) {
        console.debug('cookie.set= ' + escape(name) + "=" + value + ";path=/");
        document.cookie = escape(name) + "=" + value + ";path=/";
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
      var vCookieKey,
        vCookieVal,
        index = 0,
        vCookie = {};

      _.each(kvstore, function (value, key) {
        vCookieKey = COOKIE_PREFIX + index;
        vCookieVal = vCookie[vCookieKey] || '';

        if (cookieSize(vCookieVal) + entrySize(key) > MAX_COOKIE_LENGTH) {
          index += 1;
        }

        vCookieVal += key + '=' + CookieManager.encode(value) + '|';
        vCookie[vCookieKey] = vCookieVal;
      });

      //@TODO clear all cookies

      _.each(vCookie, function (value, key) {
        CookieManager.set(key, value);
      });
    };

    /**
     * k=val
     * k.length + '='.length + kvstore[k].length
     */
    entrySize = function (k) {
      return k.length + 1 + (kvstore[k] ? CookieManager.encode(kvstore[k]).length : 0);
    };

    cookieSize = function(value) {
      return COOKIE_PREFIX.length + 1 + (value ? CookieManager.encode(value).length : 0);
    }


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