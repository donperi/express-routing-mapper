# Express Routing Mappper

This module helps to create router for express framework to match controllers like a Rails way.

Usage:

```js
// server.js

var express = require('express')
var app = express()
var router = require('router.js');

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)

```

```js
//router.js
var Router  = require('express-routing-mapper/router');

module.exports = function(app) {
  var router = new Router(app);

  router.match('/posts', {
    to: 'posts#index'
  });

  router.match('/posts/create', 'posts#create', {
    via: 'post'
  });

  router.match('/posts/new', {
    via: 'get',
    controller: 'posts',
    action: 'new'
  });

  router.put'/posts/update', 'posts#update');

  router.namespace('admin', function() {
    this.namespace("dashboard", function() {
      this.match("/posts", "posts#index");
    })
  });

  return router;
}
```

```js
// controllers/posts.js

exports.index = function(req, res) {
  res.send()
}

exports.create = function(req, res) {
  res.status(201).send();
}

exports.new = function(req, res) {
  res.send();
}

exports.update = function(req, res) {
  res.send();
}
```


# Todo

- [ ] Manage resources.
