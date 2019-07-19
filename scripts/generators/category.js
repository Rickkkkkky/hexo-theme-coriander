/**
 * 重写 hexo-generator-category 插件
 * 生成分类页面及其分页页面，并向模板中传入 parents 变量
 */
const pagination = require('hexo-pagination')
const { getConfig } = require('../helpers/config')

function generateCategory (locals) {
    const perPage = getConfig.call(this, 'category_generator.per_page')
    const paginationDir = getConfig.call(this, 'pagination_dir', 'page')

    function findParents (category) {
        let parents = []
        if (category && category.hasOwnProperty('parent')) {
            let parent = locals.categories
                    .find({ _id: category.parent }).first()
            parents = [parent].concat(findParents(parent))
        }
        return parents
    }

    return locals.categories.reduce(function (result, category) {
        const posts = category.posts.sort('-date')
        const data = pagination(category.path, posts, {
            perPage: perPage,
            layout: ['category'],
            format: paginationDir + '/%d/',
            data: {
                category: category,
                parents: findParents(category)
            }
        })
        return result.concat(data)
    }, [])
}

/**
 * 覆盖默认的 category 生成器
 */
function register (hexo) {
    hexo.extend.generator.register('category', generateCategory)
}

module.exports = {
    register
}