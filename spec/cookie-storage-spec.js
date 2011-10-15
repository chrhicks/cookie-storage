describe('cookie-storage', function() {
  var cs = window.CookieStorage;

  it('should get same data that was put', function() {
    var returnedValue;

    cs.put('key', 'value');
    returnedValue = cs.get('key');
    expect(cs.get('key')).toEqual('value');
  });
});