describe('cookie-storage', function() {
  var cs = window.CookieStorage;

  afterEach(function() {

  });

  it('should have a cookie size of 0', function() {
    expect(document.cookie.length).toEqual(0);
  });

  it('should "get" same data that was "put"', function() {
    cs.put('key', 'value');
    expect(cs.get('key')).toEqual('value');
  });

  it('should have an expected length', function() {
    cs.put('name', 'her royal majesty queen elizabeth ii');
    console.debug(cs.get('name'));
    expect(cs.entrySize('name')).toEqual(51);
  });
}).finish(function() {
  console.debug('clearing cookies');
  _.each(document.cookie.split(';'), function (cookie) {
    var name = cookie.split('='),
      oExpDate = new Date();

    oExpDate.setDate(oExpDate.getDate() - 1);
    document.cookie = escape(name[0]) + "=; expires=" + oExpDate.toGMTString() + "; path=/";
  });
});