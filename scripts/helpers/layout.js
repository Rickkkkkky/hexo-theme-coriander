/**
 * 与页面布局相关的辅助函数
 */
 
const { getConfig } = require('./config')

/**
 * 判断是否存在某一侧边列
 * @param {string} side - left or right
 */
function hasSideColumn (side) {
    let column = getConfig.call(this, 'side_column.' + side)
    if (column instanceof Array && column.length > 0) {
        return true
    } else {
        return false
    }
}

/**
 * 根据是否存在左/右侧边列计算布局中列的数量
 */
function countLayoutColumn () {
    let count = 1
    count += hasSideColumn.call(this, 'left') ? 1 : 0
    count += hasSideColumn.call(this, 'right') ? 1 : 0
    return count
}

/**
 * 获取侧边工具栏的所有部件
 * @param {string} side - left or right
 */
function getSideWidgets (side) {
    let widgets = []
    let names = getConfig.call(this, 'side_column.' + side)
    if (names instanceof Array && names.length > 0) {
        names.forEach((name) => {
            let widget = getConfig.call(this, 'widgets.' + name)
            if (widget && typeof widget === 'object') {
                widgets.push(name)
            }
        })
    }
    return widgets
}

/**
 * 注册辅助函数
 */
function register (hexo) {
    hexo.extend.helper.register('has_side_column', hasSideColumn)
    hexo.extend.helper.register('count_layout_column', countLayoutColumn)
    hexo.extend.helper.register('get_side_widgets', getSideWidgets)
}

module.exports = {
    hasSideColumn,
    countLayoutColumn,
    getSideWidgets,
    register
}