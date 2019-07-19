---
title: 开始使用 Coriander

date: 2019-3-15 16:16:00

categories:
- 配置
- 基本配置

tags:
- 帮助文档
---

[Coriander](https://github.com/Rickkkkkky/hexo-theme-coriander) 是基于 [Bulma](https://bulma.io/) 开发的一款可配置的 Hexo 主题。主题为 Hexo 博客提供了可定制化的侧边栏工具、多种颜色主题方案以及基于 `highlight.js` 的代码高亮方案。

<!-- more -->

可以从 Github 上下载 Coriander 主题，并将主题文件夹放在 Hexo 博客的 `themes` 文件夹中。

```bash
git clone git@github.com:Rickkkkkky/hexo-theme-coriander.git themes/coriander
```

在 `_config.yml` 文件中配置博客的主题：

{% codeblock lang:yaml _config.yml %}
theme: coriander
{% endcodeblock %}

然后运行下面的命令即可查看主题效果：

```bash
hexo s
```

> Coriander 主题参考了 [hexo-theme-icarus](https://github.com/ppoffice/hexo-theme-icarus)，icarus 主题是一款功能齐全并易于上手的 Hexo 主题，在这里向大家强烈推荐！
