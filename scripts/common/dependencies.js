const logger = require('hexo-log')()

const dependencies = [
    'hexo',
    'hexo-generator-archive',
    'hexo-generator-category',
    'hexo-generator-index',
    'hexo-generator-json-content',
    'hexo-generator-tag',
    'hexo-renderer-ejs',
    'hexo-renderer-sass',
    'hexo-renderer-stylus'
]

function checkDependency (name) {
    try {
        require.resolve(name)
        return true
    } catch (error) {
        logger.error(`Missing package ${name}.`)
    }
    return false
}

function check () {
    let hasMissing = false
    dependencies.forEach((name) => {
        if (!checkDependency(name)) {
            hasMissing = true
        }
    })
    if (hasMissing) {
        logger.error('Please install the missing dependencies from the root directory of your Hexo site.')
        process.exit(-1)
    } else {
        logger.info('Dependencies all installed.')
    }
}

module.exports = {
    check
}