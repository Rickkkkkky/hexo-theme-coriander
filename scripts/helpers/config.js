/**
 * 主题配置相关的辅助函数
 */

 const specs = require('../specs/config.spec')
 const descriptors = require('../common/utils').descriptors

/**
 * 根据属性路径获取对象中的属性值
 * @param {object} obj
 * @param {string} path
 */
function readProperty (obj, path) {
    const fields = path.split('.')
    for (let field of fields) {
        if (typeof obj === 'undefined'
                || obj === null || !obj.hasOwnProperty(field)) {
            return null
        }
        obj = obj[field]
    }
    return obj
}

/**
 * 获取配置项的值
 * 优先级：页面配置、网站配置、主题配置
 * 如果配置项未设置，返回 null
 * @param {string} field
 * @param {*} [defaultValue=undefined]
 * @param {boolean} [includePage=true]
 */
function getConfig (field, defaultValue = undefined, includePage = true) {
    let obj = Object.assign({}, this.theme, includePage ? this.page : {})
    let value = readProperty(obj, field)
    if (value === null) {
        if (typeof defaultValue !== 'undefined') {
            value = defaultValue
        } else {
            const property = readProperty(specs, field)
            value = property === null ?
                    null : property[descriptors.defaultValue]
        }
    }
    return value
}

/**
 * 判断配置项是否设置
 * @param {string} field
 * @param {boolean} [includePage=true]
 */
function hasConfig (field, includePage = true) {
    return getConfig.call(this, field, null, includePage) !== null
}

/**
 * 从给定配置对象中获取配置项的值
 * @param {object} options
 * @param {string} field
 * @param {*} defaultValue
 */
function getConfigFrom (options, field, defaultValue = undefined) {
    let value = readProperty(options, field)
    if (value === null) {
        if (typeof defaultValue !== 'undefined') {
            value = defaultValue
        } else {
            value = null
        }
    }
    return value
}

/**
 * 注册辅助函数
 */
function register (hexo) {
    hexo.extend.helper.register('get_config', getConfig)
    hexo.extend.helper.register('has_config', hasConfig)
    hexo.extend.helper.register('get_config_from', getConfigFrom)
}

module.exports = {
    readProperty,
    getConfig,
    hasConfig,
    getConfigFrom,
    register
}