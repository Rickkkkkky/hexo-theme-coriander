/**
 * 与样式相关的辅助函数
 * 注意：辅助函数与样式类强耦合
 */

const { isLinkActive } = require('./site')
const { countLayoutColumn } = require('./layout')

/**
 * 判断路径是否是当前页面路径，是则返回 is-active 类
 * @param {string} path
 */
function linkIsActiveClass (path) {
    if (isLinkActive.call(this, path)) {
        return 'is-active'
    } else {
        return ''
    }
}

/**
 * 中间列占据布局空间的样式类
 */
function mainColumnSizeClass () {
    switch (countLayoutColumn.call(this)) {
        case 1:
            return 'is-12'
        case 2:
            return 'is-8-tablet is-8-desktop is-8-widescreen'
        case 3:
            return 'is-8-tablet is-8-desktop is-6-widescreen'
        default:
            return ''
    }
}

/**
 * 侧边列占据布局空间的样式类
 */
function sideColumnSizeClass () {
    switch (countLayoutColumn.call(this)) {
        case 2:
            return 'is-4-tablet is-4-desktop is-4-widescreen'
        case 3:
            return 'is-4-tablet is-4-desktop is-3-widescreen'
        case 1:
        default:
            return ''
    }
}

/**
 * 侧边栏是否显示样式类
 */
function sideColumnVisibilityClass (side) {
    if (countLayoutColumn.call(this) && side === 'right') {
        return 'is-hidden-touch is-hidden-desktop-only'
    } else {
        return ''
    }
}

/**
 * 侧边列在布局中顺序的样式类
 */
function sideColumnOrderClass (side) {
    switch (side) {
        case 'left':
            return 'has-order-1'
        case 'right':
            return 'has-order-3'
        default:
            return ''
    }
}

function sideColumnClass (side) {
    let style = 'column-' + side
    switch (countLayoutColumn.call(this)) {
        case 2:
            style += ' is-4-tablet is-4-desktop is-4-widescreen'
            style += ' is-hidden-mobile'
            break
        case 3:
            style += ' is-4-tablet is-4-desktop is-3-widescreen'
            if (side === 'right') {
                style += ' is-hidden-touch is-hidden-desktop-only'
            } else if (side === 'left') {
                style += ' is-hidden-mobile'
            }
            break
        case 1:
        default:
            style += ' '
    }
    switch (side) {
        case 'left':
            style += ' has-order-1'
            break
        case 'right':
            style += ' has-order-3'
            break
        default:
            style += ' '
    }

    return style
}

/**
 * 注册辅助函数
 */
function register (hexo) {
    hexo.extend.helper
        .register('link_is_active_class', linkIsActiveClass)
    hexo.extend.helper
        .register('main_column_size_class', mainColumnSizeClass)
    hexo.extend.helper
        .register('side_column_class', sideColumnClass)
}

module.exports = {
    linkIsActiveClass,
    mainColumnSizeClass,
    sideColumnSizeClass,
    sideColumnOrderClass,
    register
}