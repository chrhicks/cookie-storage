describe('cookie-storage', function() {
  var cs = new CookieStore('cskv_'),
    cm = CookieStorage.CookieManager,
    clearCookies,
    getRandomArbitary,
    randomWords;

  clearCookies = function () {
    _.each(document.cookie.split(';'), function (cookie) {
      var name = cookie.split('='),
        oExpDate = new Date();

      oExpDate.setDate(oExpDate.getDate() - 1);
      document.cookie = escape(name[0]) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
    });
  };

  getRandomArbitary = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomWords = function (count) {
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
      minSize = 3,
      maxSize = 16,
      result = '';

      _(count).times(function (n) {
        _(getRandomArbitary(minSize, maxSize)).times(function () {
          result += letters[getRandomArbitary(0, letters.length)];
        });

        if (n < count - 1) {
          result += ' ';
        }
      });

      return result;
  };

  beforeEach(function () {
    clearCookies();
  });

  /*
   * CookieStorage.CookieManger
   */
  describe('cookie-manager', function () {
    it('should return null', function () {
      expect(cm.get('does_not_exist')).toEqual(null);
    });

    it('should get what was just set', function () {
      var varName = 'shouldEquals',
        varValue = 'a test string ? ; = ,';
      cm.set(varName, cm.encode(varValue));

      expect(cm.get(varName)).toEqual(varValue);
    });

    it('should remove the cookie', function () {
      var name = "cookieName",
        value = "value";

      cm.set(name, value);
      expect(cm.get(name)).toEqual(value);

      cm.remove(name);
      expect(cm.get(name)).toEqual(null);
    });

    it('should pass when set, fail when not set', function () {
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
  it('should have a cookie size of 0', function () {
    expect(document.cookie.length).toEqual(0);
  });

  it('should "get" same data that was "put"', function() {
    var name = "cookieName",
      value = "value";

    cs.put(name, value);
    expect(cs.get(name)).toEqual(value);
  });

  it('should have an expected length', function () {
    var name = "name",
      value = "her royal majesty queen elizabeth ii";
    cs.put(name, value);
    expect(cs.entrySize('name')).toEqual(51);
  });

  it('should have a no cookie stores', function () {
    cs.clearStores();
    cs.loadStores();
    expect(cs.listStores().length).toEqual(0);
  });

  it('should have a single cookie store', function () {
    var name = "cookieName",
      value = "value";
    cs.loadStores();
    expect(cs.listStores().length).toEqual(0);
    cs.put(name, value);
    expect(cs.listStores().length).toEqual(1);
  });

  it('should span multiple cookie stores', function () {
    var numEntries = 80;

    cs.loadStores();

    _(numEntries).times(function () {
      cs.put(randomWords(1), randomWords(getRandomArbitary(1, 11)));
    });

    expect(cs.listStores().length > 1).toEqual(true);
  });
});