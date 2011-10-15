describe('cookie-storage', function() {
  var cs = window.CookieStorage;

  it('should have a cookie size of 0', function() {
    expect(document.cookie.length).toEqual(0);
  });

  it('should "get" same data that was "put"', function() {
    cs.put('key', 'value');
    expect(cs.get('key')).toEqual('value');
  });
});