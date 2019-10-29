 /* 
 **插入引用文件至html (cj)
 */

function AddResource(options) {
    // Setup the plugin instance with options...
    this.options = options;
}

AddResource.prototype.apply = function(compiler) {
    var self = this;
    // console.log(this.options);
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
            self.options.map(item => {
                // console.log(item.isCreat, typeof item.isCreat)
                if(item.isCreat){
                    var _s = self.add(item);
                    htmlPluginData.html = htmlPluginData.html.replace(item.insertEle, _s+item.insertEle);
                }
            })
            callback(null, htmlPluginData);
        });
    });
}

AddResource.prototype.add = function(obj){
    var _s = '';
    switch (obj.type) {
        case 'js':
            _s = `<script type=text/javascript src=${obj.src} ></script>`
            break;
        case 'css':
            _s = `<link rel=stylesheet href=${obj.src} />`
                break;
        default:
            break;
    }
    return _s;
}

module.exports = AddResource;