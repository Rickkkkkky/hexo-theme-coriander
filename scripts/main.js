$(document).ready(function () {
    // 移动端导航栏按钮控制导航菜单显隐
    $('.navbar-burger').click(function () {
        $(this).toggleClass('is-active')
        $('#' + this.dataset.target).toggleClass('is-active')
    })
})