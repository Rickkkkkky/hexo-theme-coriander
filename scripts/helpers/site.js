/**
 * 与网站属性相关的辅助函数
 */
 const moment = require('moment');

/**
 * 获取 url 中的路径
 * @param {string} url
 */
function santize (url) {
    let paths = url.replace(/(^\w+:|^)\/\//, '').split('#')[0].split('/').filter((p) => p.trim() !== '')
    if (paths.length > 0 && paths[paths.length - 1].trim() === 'index.html') {
        paths = paths.slice(0, paths.length - 1)
    }
    return paths.join('/')
}

/**
 * 比较两个链接的路径是否相同
 * @param {string} a
 * @param {string} b
 */
function isSameLink (a, b) {
    return santize(this.url_for(a)) === santize(this.url_for(b))
}

/**
 * 判断链接是否与当前页面链接相同
 * @param {string} link
 */
function isLinkActive (link) {
    if (isSameLink.call(this, link, this.page.path)) {
        return true
    } else {
        return false
    }
}

/**
 * 计算一个段落的字数
 * @param {string} content
 */
function countWord (content) {
    content = content.replace(/<\/?[a-z]+[^>]*>/gi, '').trim()
    return content ? (content.match(/[\u00ff-\uffff]|[a-zA-Z]+/g) || []).length : 0
}

/**
 * 根据父子关系对 categories 划分层级
 * @param {number} depth
 */
function createCategoriesList (depth, parent = '') {
    let categories = this.site.categories

    function getChildren (parent) {
        const query = {}

        if (parent) {
            query.parent = parent
        } else {
            query.parent = { $exists: false }
        }

        return categories
                .find(query)
                .sort('name', 1)
                .filter(cat => cat.length)
    }

    function hierachicalList (level, parent) {
        let list = getChildren(parent)
        list.forEach((cat, i) => {
            if (!depth || level + 1 < depth) {
                cat.children = hierachicalList(level + 1, cat._id)
            }
        })
        return list
    }

    return hierachicalList(0, parent)
}

/**
 * 根据文章发布日期进行统计
 */
function createArchivesList () {
    let list = {}
    this.site.posts.forEach((post) => {
        let date = post.date.format('YYYY-MM-01')
        list[date] = (list[date] || []).concat(post)
    })
    let dates = Object.keys(list).sort((a, b) => {
        if (moment(a).isBefore(moment(b))) {
            return -1;
        } else {
            return 1;
        }
    })
    return { dates, list }
}

/**
 * 注册辅助函数
 */
function register (hexo) {
    hexo.extend.helper.register('is_same_link', isSameLink)
    hexo.extend.helper.register('is_link_active', isLinkActive)
    hexo.extend.helper.register('count_word', countWord)
    hexo.extend.helper.register('create_categories_list', createCategoriesList)
    hexo.extend.helper.register('create_archives_list', createArchivesList)
}

module.exports = {
    santize,
    isSameLink,
    isLinkActive,
    countWord,
    createCategoriesList,
    createArchivesList,
    register
}