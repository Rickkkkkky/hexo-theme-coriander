// Helpers
require('./helpers/config').register(hexo)
require('./helpers/moment').register(hexo)
require('./helpers/layout').register(hexo)
require('./helpers/site').register(hexo)
require('./helpers/page').register(hexo)
require('./helpers/style').register(hexo)

// Filter
require('./filters/patch_content').register(hexo)

// Generator
require('./generators/category').register(hexo)
require('./generators/categories').register(hexo)
require('./generators/tags').register(hexo)

// Welcome
require('hexo-log')().info(`
 _______  _______  ______    ___   _______  __    _  ______   _______  ______   
|       ||       ||    _ |  |   | |   _   ||  |  | ||      | |       ||    _ |  
|       ||   _   ||   | ||  |   | |  |_|  ||   |_| ||  _    ||    ___||   | ||  
|       ||  | |  ||   |_||_ |   | |       ||       || | |   ||   |___ |   |_||_ 
|      _||  |_|  ||    __  ||   | |       ||  _    || |_|   ||    ___||    __  |
|     |_ |       ||   |  | ||   | |   _   || | |   ||       ||   |___ |   |  | |
|_______||_______||___|  |_||___| |__| |__||_|  |__||______| |_______||___|  |_|

`)

// Chech Dependencies
require('./common/dependencies').check()

// Debug helper
hexo.extend.helper.register('console', function () {
    console.log.apply(console, Array.prototype.slice.apply(arguments))
})