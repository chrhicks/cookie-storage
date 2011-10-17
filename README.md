#CookieStorage

A cookie backed JavaScipt kvstore.

##Usage

As you can imagine the API is straightforward.

There is put:

```javascript
CookieStorage.put('name', 'Chris'); // Save name=Chris to kvstore
```

..and get:

```javascript
CookieStorage.get('name'); // Returns 'Chris'
```

##How it works

CookieStorage maintains a map of keys and values internally and persists them to cookies during every `put` request. Using the example above, the following statement:

```javascript
CookieStorage.put('name', 'Chris');
```

...would generate a cookie similar to this

```
cskv_0=name=Chris;path=/
```

A more complicated example:


```javascript
CookieStorage.put('name', 'Barack Obama');
CookieStorage.put('title', 'President of the United States');
CookieStorage.put('dob', 'August 4, 1961');

// Cookie:
// cskv_0=name=Barack%20Obama|title=President%20of%20the%20United%20States|dob=August%204%2C%201961
```
