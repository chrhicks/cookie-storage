#CookieStorage

Often when you save data into cookies it uses up a small amount of data. Since a cookie can use up to 4096 bytes, the majority of the space is wasted! Also, as a general rule of thumb, a domain can have a maximum of 20 cookies. But what if that isn't enough?

CookieStorage solves these problems by efficiently using the maximum size of a cookie and packing data into a single cookie until the full 4096 bytes are consumed. Read on to learn more...

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

In addition to the main functions, there are more utility methods that assist with managing the cookies. You can check them out by viewing the source.

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
// cskv_0=name=Barack%20Obama|title=President%20of%20the%20United%20States|dob=August%204%2C%201961;path=/
```

When CookieStorage is initialized, it loads all of the cskv_* cookies into its internal map of key value pairs.

###CookieManager

CookieStorage comes with a primitive api to read and write cookies. If it does not meet your needs, feel free to extend or override `CookieStorage.CookieManager`.

The only safety feature of CookieManager is to ensure that the cskv_* cookies don't exceed the 4096B limit.

When using `document.cookie`, `,`, `;`, and `space` are illegal characters and must be encoded. In addition to this, CookieStorage uses `|` to separate the key/value pairs in the cookies. Other than that, use `CookieStorage.put` as you would `document.cookie`.

##TODO
* Add `CookieStorage.remove` function to erase a k/v pair.
* Make it possible for a k/v pair to span multiple cookies.
* Create libraries for other languages such as PHP, Java, Ruby, etc.
