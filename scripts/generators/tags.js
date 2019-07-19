/**
 * 生成分类列表页面
 */
function generateTags (locals) {
    return {
        path: 'tags/',
        layout: ['tags'],
        data: Object.assign({}, locals, { isTags: true })
    }
}

function register (hexo) {
    hexo.extend.generator.register('tags', generateTags)
}

module.exports = {
    register
}