describe('cookie-storage', function() {
  var cs = window.CookieStorage,
    cm = cs.CookieManager,
    clearCookies;

  clearCookies = function() {
    _.each(document.cookie.split(';'), function (cookie) {
      var name = cookie.split('='),
        oExpDate = new Date();

      oExpDate.setDate(oExpDate.getDate() - 1);
      document.cookie = escape(name[0]) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
    });
  };

  beforeEach(function() {
    clearCookies();
  });

  /*
   * CookieStorage.CookieManger
   */
  describe('cookie-manager', function() {
    it('should return null', function() {
      expect(cm.get('does_not_exist')).toEqual(null);
    });

    it('should get what was just set', function() {
      var varName = 'shouldEquals',
        varValue = 'a test string ? ; = ,';
      cm.set(varName, cm.encode(varValue));

      expect(cm.get(varName)).toEqual(varValue);
    });

    it('should remove the cookie', function() {
      var name = "cookieName",
        value = "value";

      cm.set(name, value);
      expect(cm.get(name)).toEqual(value);

      cm.remove(name);
      expect(cm.get(name)).toEqual(null);
    });

    it('should pass when set, fail when not set', function() {
      var name = "cookieName",
        value = "value";

      cm.set(name, value);
      expect(cm.isSet(name)).toEqual(true);

      cm.remove(name);
      expect(cm.isSet(name)).toEqual(false);
    });
  });

  /*
   * CookieStorage
   */
  it('should have a cookie size of 0', function() {
    expect(document.cookie.length).toEqual(0);
  });

  it('should "get" same data that was "put"', function() {
    var name = "cookieName",
      value = "value";

    cs.put(name, cm.encode(value));
    expect(cs.get(name)).toEqual(value);
  });

  it('should have an expected length', function() {
    var name = "name",
      value = "her royal majesty queen elizabeth ii";
    cs.put(name, value);
    expect(cs.entrySize('name')).toEqual(51);
  });
});