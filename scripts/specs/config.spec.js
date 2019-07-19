const { version } = require('../../package.json')
const { doc, type, format, required, requires, defaultValue } = 
        require('../common/utils').descriptors

module.exports = {
    [type]: 'object',
    [doc]: '配置文件根对象',
    [required]: true,
    version: {
        [type]: 'string',
        [doc]: 'Coriander 主题版本号',
        [required]: true,
        [defaultValue]: version
    },
    style_scheme: {
        [type]: 'string',
        [doc]: '样式方案',
        [defaultValue]: 'bulma'
    },
    favicon: {
        [type]: 'string',
        [doc]: '网站图标文件的路径',
        [defaultValue]: '/images/favicon.ico'
    },
    logo: {
        [type]: 'string|object',
        [doc]: '网站 logo 图片的路径',
        [defaultValue]: '/images/logo.png',
        text: {
            [type]: 'string',
            [doc]: '以文字形式显示 logo',
            [defaultValue]: null
        }
    },
    navbar: {
        [type]: 'object',
        [doc]: '导航栏配置',
        menu: {
            [type]: 'array',
            [doc]: '添加导航菜单链接',
            [defaultValue]: [],
            '*': {
                name: {
                    [type]: 'string',
                    [doc]: '链接显示名称'
                },
                path: {
                    [type]: 'string',
                    [doc]: '链接路径'
                }
            }
        }
    },
    widgets: {
        [type]: 'object',
        [doc]: '侧边列部件配置',
        profile: {
            [type]: 'object',
            [doc]: '个人简介部件配置',
            [defaultValue]: {},
            author: {
                [type]: 'string',
                [doc]: '作者姓名',
                [defaultValue]: 'Your name'
            },
            author_desc: {
                [type]: 'string',
                [doc]: '作者描述',
                [defaultValue]: 'Your description'
            },
            avatar: {
                [type]: 'string',
                [doc]: '头像图片路径',
                [defaultValue]: '/images/avatar.png'
            },
            email: {
                [type]: 'string',
                [doc]: '电子邮件地址',
                [defaultValue]: 'your@email.address'
            },
            follow_link: {
                [type]: 'string',
                [doc]: '关注按钮链接',
                [defaultValue]: 'https://github.com/Rickkkkkky'
            }
        },
        categories: {
            [type]: 'object',
            [doc]: '目录部件配置',
            [defaultValue]: {},
            limit: {
                [type]: 'number',
                [doc]: '部件显示的分类数量上限',
                [defaultValue]: 5
            }
        },
        tags: {
            [type]: 'object',
            [doc]: '标签部件配置',
            [defaultValue]: {},
            limit: {
                [type]: 'number',
                [doc]: '部件显示的标签数量上限',
                [defaultValue]: 5
            }
        },
        archives: {
            [type]: 'object',
            [doc]: '归档部件配置',
            [defaultValue]: {},
            limit: {
                [type]: 'number',
                [doc]: '部件显示的月份数量上限',
                [defaultValue]: 10,
            }
        },
        recent_post: {
            [type]: 'object',
            [doc]: '最近文章部件配置',
            [defaultValue]: {},
            limit: {
                [type]: 'number',
                [doc]: '部件显示的文章数量上限',
                [defaultValue]: 5
            }
        }
    },
    side_column: {
        [type]: 'object',
        [doc]: '侧边列包含的部件配置',
        left: {
            [type]: 'array',
            [doc]: '左侧边列包含的部件配置',
            [defaultValue]: [],
            '*': {
                [type]: 'string',
                [doc]: '部件名称'
            }
        },
        right: {
            [type]: 'array',
            [doc]: '右侧边列包含的部件配置',
            [defaultValue]: [],
            '*': {
                [type]: 'string',
                [doc]: '部件名称'
            }
        }
    },
    article: {
        [type]: 'object',
        [doc]: '文章显示配置',
        thumbnail: {
            [type]: 'object',
            [doc]: '文章缩略图配置',
            enable: {
                [type]: 'boolean',
                [doc]: '是否显示文章缩略图',
                [defaultValue]: true
            }
        },
        readtime: {
            [type]: 'object',
            [doc]: '文章阅读时间配置',
            enable: {
                [type]: 'boolean',
                [doc]: '是否显示文章阅读时间',
                [defaultValue]: true
            }
        },
        highlight: {
            [type]: 'object',
            [doc]: '文章中代码高亮配置',
            enable: {
                [type]: 'boolean',
                [doc]: '是否开启代码高亮',
                [defaultValue]: true
            },
            theme: {
                [type]: 'string',
                [doc]: '代码高亮主题',
                [defaultValue]: 'github'
            }
        }
    },
    category_generator: {
        [type]: 'object',
        [doc]: 'category 生成器配置',
        per_page: {
            [type]: 'number',
            [doc]: '每页的文章数量',
            [defaultValue]: 5
        }
    }
}