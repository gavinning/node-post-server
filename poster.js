var fs = require('fs');
var path = require('path');
var lab = require('linco.lab');
var extend = require('aimee-extend');
var Config = require('vpm-config').Config;

class Poster {
    constructor() {
        this.extend = extend;
        this.config = new Config;
    }

    /**
     * 检查是否为安全路径
     * @param   {String}   src url
     * @return  {Boolean}      是否为安全路径
     * @example this.safePath('a')
     */
    safePath(src){
        return this.config.get('safePaths').some((url) => {
            src = path.normalize(src);
            url = (url + path.sep).replace(/[\\\/]+$/, path.sep);
            return src.indexOf(url) === 0 && src !== url;
        })
    }

    /**
     * Link souce to target
     * @param   {String}   source 源地址
     * @param   {String}   target 目标地址
     * @param   {Function} fn     回调函数，可选
     * @example this.dest('a', 'b')
     */
    dest(source, target, fn) {
        if(this.safePath(target)){
            lab.mkdir(path.dirname(target));
            try{
                fs.unlinkSync(target)
            }
            catch(e){
                console.log(e.message, 'node-post-server|poster.js|41')
            }
            // 同步 Or 异步
            if(!lab.isFunction(fn)){
                // 复制文件到目的地
                fs.linkSync(source, target);
                // 删除原有链接
                fs.unlinkSync(source);
            }
            else{
                fs.link(source, target, function(err){
                    if(err){
                        fn(err)
                    }
                    else{
                        fn(null);
                        fs.unlinkSync(source);
                    }
                })
            }
        }
        else{
            if(fn){
                fn(new Error('Must be use workplace'))
            }
            else{
                throw new Error('Must be use workplace')
            }
        }
    }
}

module.exports = Poster;
