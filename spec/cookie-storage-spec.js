describe('cookie-storage', function() {
  var cs = window.CookieStorage;

  it('should get same data that was put', function() {
    cs.put('key', 'value');
    expect(cs.get('key')).toEqual('value');
  });
});