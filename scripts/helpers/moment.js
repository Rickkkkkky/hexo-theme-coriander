/**
 * 暴露出 moment.js 中的一些函数
 */

const moment = require('moment')

function duration () {
    return moment.duration.apply(moment, arguments)
}

function register (hexo) {
    hexo.extend.helper.register('duration', duration)
}

module.exports = {
    duration,
    register
}