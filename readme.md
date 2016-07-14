# Node-post-server
本模块需要配合 [node-post](https://www.npmjs.com/package/node-post) 使用  

```sh
npm i node-post-server --save
```

### Exporess router
```js


var path = require('path');
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var Poster = require('node-post-server');
var poster = new Poster;

// 允许写入的路径
poster.config.init({
    safePaths: [
        '/Users/gavinning/Desktop/test',
        '/Users/gavinning/Desktop/test1'
    ]
})

// Upload api
router.post('/upload', multipartMiddleware, (req, res) => {
    var user, source, target;

    user = auth(req);

    if(!checkuser(user)){
        return res.status(403).send('Permission denied')
    }

    // 上传文件的临时路径
    source = req.files[req.body.field].path;
    // 最终目标路径
    target = path.normalize(req.body.filepath);

    // 自动校检安全路径
    poster.dest(source, target, (err) => {
        err ?
            res.status(403).send(err.message):
            res.status(200).send(target)
    })
})

```

req.files
```js
req.files = {
    files: {
        fieldName: 'files',
        originalFilename: '1.png',
        path: '/var/folders/wv/f11wc52113lfnqrnp0pEv8_m0000gn/T/lFs43x3i0saqM2FEriU5VS7v.png',
        headers: { 'content-disposition': 'form-data; name="files"; filename="1.png"',
        'content-type': 'image/png' },
        size: 67092,
        name: '1.png',
        type: 'image/png'
    }
}
```
