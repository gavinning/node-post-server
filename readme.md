# Node-post-server
本模块需要配合 [node-post](https://www.npmjs.com/package/node-post) 使用  

```sh
npm i node-post-server --save
```

### Example
```js
var Poster = require('node-post-server');
var poster = new Poster;

// 允许写入的路径
poster.config.init({
    safePaths: [
        '/Users/gavinning/Desktop/test',
        '/Users/gavinning/Desktop/test1'
    ]
})
```

Exporess router
```js
var path = require('path');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

// Upload api
router.post('/upload', multipartMiddleware, (req, res) => {
    // 上传文件的临时路径
    var source = req.files[req.body.field].path;
    // 最终目标路径
    var target = path.normalize(req.body.filepath);

    // 自动校检安全路径
    poster.dest(source, target, (err) => {
        if(err){
            throw err;
        }
    })
})

```

### Other
```js

```
