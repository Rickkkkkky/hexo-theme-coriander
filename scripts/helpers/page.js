/**
 * 与页面或文章相关的辅助函数
 */

const { getConfig } = require('./config')

/**
 * 判断页面是否是 categories 页面
 */
function isCategories (page = null) {
    return !!(page === null ? this.page : page).isCategories
}

/**
 * 判断页面是否是 tags 页面
 */
function isTags (page = null) {
    return !!(page === null ? this.page : page).isTags
}

/**
 * 根据页面类型生成 <title> 标签的文本
 * @param {object} [page=null]
 */
function createPageTitle (page = null) {
    page = page === null ? this.page : page
    let pageTitle = page.title

    if (this.is_archive()) {
        pageTitle = this._p('common.archive', Infinity)
        if (this.is_year()) {
            pageTitle += ': ' + page.year
        } else if (this.is_month()) {
            pageTitle += ': ' + page.year + '/' + page.month
        }
    } else if (this.is_category()) {
        pageTitle = this._p('common.category', 1) + ': ' + page.category.name
    } else if (this.is_tag()) {
        pageTitle = this._p('common.tag', 1) + ': ' + page.tag
    } else if (isCategories.call(this)) {
        pageTitle = this._p('common.category', Infinity)
    } else if (isTags.call(this)) {
        pageTitle = this._p('common.tag', Infinity)
    }

    let siteTitle = this.get_config('title', '', false)
    let title = [pageTitle, siteTitle].filter((str) => {
        return typeof str !== 'undefined' && str.trim() !== ''
    }).join(' - ')

    return title
}

/**
 * 判断文章是否存在缩略图
 * @param {object} post
 */
function hasThumbnail (post) {
    const allow = getConfig.call(this, 'article.thumbnail.enable', true)
    if (!allow) {
        return false
    } else {
        return post.hasOwnProperty('thumbnail') && post.thumbnail
    }
}

/**
 * 获取文章缩略图路径
 * @param {object} post
 */
function getThumbnail (post) {
    let path = post.thumbnail ? post.thumbnail : ''
    return this.url_for(path)
}

/**
 * 根据页面索引获取分页链接
 * @param {number} index
 */
function getPaginateUrl (index) {
    let dir = getConfig.call(this, 'pagination_dir')
    let path = index === 1 ?
            this.page.base : this.page.base + dir + '/' + index + '/'
    return this.url_for(path)
}

/**
 * 创建页面分页列表
 */
function createPaginateList () {
    let current = this.page.current
    let total = this.page.total
    let last
    let range = []
    let list = []
    // 计算要显示的页码
    for (let i = 1; i <= total; i++) {
        if (i == 1 || i == total || (i >= current - 1 && i <= current + 1)) {
            range.push(i)
        }
    }
    // 生成 list 元素
    for (let i of range) {
        if (last) {
            if (i - last !== 1) {
                list.push({
                    type: 'hellip'
                })
            }
        }
        list.push({
            type: 'link',
            isCurrent: i === current,
            href: getPaginateUrl.call(this, i),
            index: i
        })
        last = i
    }
    return list
}

/**
 * 注册辅助函数
 */
function register (hexo) {
    hexo.extend.helper.register('is_categories', isCategories)
    hexo.extend.helper.register('is_tags', isTags)
    hexo.extend.helper.register('create_page_title', createPageTitle)
    hexo.extend.helper.register('has_thumbnail', hasThumbnail)
    hexo.extend.helper.register('get_thumbnail', getThumbnail)
    hexo.extend.helper.register('get_paginate_url', getPaginateUrl)
    hexo.extend.helper.register('create_paginate_list', createPaginateList)
}

module.exports = {
    createPageTitle,
    hasThumbnail,
    getThumbnail,
    getPaginateUrl,
    createPaginateList,
    register
}