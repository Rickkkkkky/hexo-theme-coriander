/**
 * 生成分类列表页面
 */
function generateCategories (locals) {
    return {
        path: 'categories/',
        layout: ['categories'],
        data: Object.assign({}, locals, { isCategories: true })
    }
}

function register (hexo) {
    hexo.extend.generator.register('categories', generateCategories)
}

module.exports = {
    register
}