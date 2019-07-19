const cheerio = require('cheerio')

/**
 * 向代码块和代码元素添加 hljs 类
 */
function patchCodeWithHljs (content) {
    const $ = cheerio.load(content, { decodeEntities: false })
    $('figure.highlight').addClass('hljs')
    $('figure.highlight .code .line span').each(function () {
        for (let styleClass of $(this).attr('class').split(' ')) {
            $(this).removeClass(styleClass).addClass('hljs-' + styleClass)
        }
    })
    return $.html()
}

/**
 * 补充代码块
 */
function patchCode (data) {
    data.content = patchCodeWithHljs(data.content)
    data.excerpt = patchCodeWithHljs(data.excerpt)
    return data
}

/**
 * 注册过滤器
 */
function register (hexo) {
    hexo.extend.filter.register('after_post_render', patchCode)
}

module.exports = {
    patchCodeWithHljs,
    patchCode,
    register
}