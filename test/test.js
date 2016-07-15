var Poster = require('../poster');
var poster = new Poster;

poster.config.merge({
    safePaths: [
        '/Users/gavinning/Desktop/test',
        '/Users/gavinning/Desktop/test1'
    ]
})

poster.dest(
    '/Users/gavinning/Pictures/1.png',
    '/Users/gavinning/Desktop/test1/1.png',
    (err) => {
        if(err)
            throw err;
    }
)
