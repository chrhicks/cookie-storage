/*jslint nomen: true, indent: 2 */
/*global _:true, document:true */
(function (scope) {
  "use strict";

  if (!scope) {
    scope = {};
  }

  scope.CookieStorage = scope.CookieStorage || (function () {
    var CookieManager;

    CookieManager = (function () {
      var set, get, remove, isSet, encode;

      encode = function (s) {
        s = s.replace(/,/g, '%2C');
        s = s.replace(/;/g, '%3B');
        s = s.replace(/\s/g, '%20');
        s = s.replace(/\|/g, '%7C');

        return s;
      };

      isSet = function (name) {
        return (new RegExp("(?:^|;\\s*)" + encodeURI(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
      };

      set = function (name, value) {
        document.cookie = encodeURI(name) + "=" + value + ";path=/";
      };

      get = function (name) {
        if (!isSet(name)) { return null; }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + encodeURI(name).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
      };

      remove = function (name) {
        var oExpDate = new Date();
        oExpDate.setDate(oExpDate.getDate() - 1);
        document.cookie = encodeURI(name) + "=expired;expires=" + oExpDate.toGMTString() + ";path=/";
      };

      return {
        set: set,
        get: get,
        remove: remove,
        isSet: isSet,
        encode: encode
      };

    }());

    return {
      CookieManager: CookieManager
    };
  }());

  scope.CookieStore = scope.CookieStore || (function () {
    var CookieManager, MAX_COOKIE_LENGTH;

    MAX_COOKIE_LENGTH = 4096;
    CookieManager = CookieStorage.CookieManager;
    function CookieStore(namespace) {
      this.prefix = namespace;
      this.loadStores();
    }

    CookieStore.prototype.persist = function () {
      var vCookieKey,
        vCookieVal,
        index = 0,
        vCookie = {},
        store = this;

      _.each(this.kvstore, function (value, key) {
        vCookieKey = store.prefix + index;
        vCookieVal = vCookie[vCookieKey] || '';

        if (store.cookieSize(vCookieVal) + store.entrySize(key) > MAX_COOKIE_LENGTH) {
          index += 1;
        }

        vCookieVal += key + '=' + CookieManager.encode(value) + '|';
        vCookie[vCookieKey] = vCookieVal;
      });

      store.clearStores();

      _.each(vCookie, function (value, key) {
        CookieManager.set(key, value);
      });
    };

    CookieStore.prototype.listStores = function () {
      var regEx = new RegExp(this.prefix + "\\d+", "g");
      return document.cookie.match(regEx) || [];
    };

    CookieStore.prototype.clearStores = function () {
      _.each(this.listStores(), function (storeKey) {
        CookieManager.remove(storeKey);
      });
    };

    CookieStore.prototype.loadStores = function () {
      var cookieVal, parts,
        kvo = {};

      _.each(this.listStores(), function (storeKey) {
        cookieVal = CookieManager.get(storeKey);
        _.each(cookieVal.split('|'), function (pair) {
          parts = pair.split("=");
          if (parts[0]) {
            kvo[parts[0]] = parts[1];
          }
        });
      });

      this.kvstore = kvo;
    };

    /**
     * k=val
     * k.length + '='.length + kvstore[k].length
     */
    CookieStore.prototype.entrySize = function (k) {
      return k.length + 1 + (this.kvstore[k] ? CookieManager.encode(this.kvstore[k]).length : 0);
    };

    CookieStore.prototype.cookieSize = function (value) {
      return this.prefix.length + 2 + (value ? CookieManager.encode(value).length : 0);
    };

    CookieStore.prototype.put = function (k, v) {
      this.kvstore[k] = v;
      this.persist();
    };

    CookieStore.prototype.get = function (k) {
      return this.kvstore[k];
    };

    return CookieStore;
  })();
}(this));