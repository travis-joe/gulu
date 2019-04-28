const path = require('path')
module.exports = {
    css: {
        loaderOptions: {
            sass: {
                includePath: [path.join(__dirname, 'styles')]
            }
        }
    }
}