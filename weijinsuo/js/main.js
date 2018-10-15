/*
    自定义js脚本
 */

$(function() {
    function resize() {
        var windowWidth = $(window).width();
        //根据屏幕大小设置图片大小
        var isSmallScreen = windowWidth < 768;
        $('#ad > .carousel-inner > .item').each(function(i, item) {
            var $item = $(item);
            var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
            //设置背景图片
            $item.css('backgroundImage', 'url("' + imgSrc + '")');
            if (isSmallScreen) {
                $item.html('<img src="' + imgSrc + '"/>');
            } else {
                $item.empty();
            }

        });
    }

    $(window).on('resize', resize).trigger('resize');
    //初始化tooltips插件
    $('[data-toggle="tooltip"]').tooltip();

    //控制标签页的变迁容器的宽度

    var $ulContainer = $('.nav-tabs');
    //获取所有元素的宽度和
    var width = 30; //因为原本ul上有padding-left
    //遍历子元素
    $ulContainer.children().each(function(index, element) {
        // console.log(element.clientWidth);
        width += element.clientWidth;
    });
    //判断当前ul的宽度是否超出屏幕，如果超出就显示横向滚动条
    if (width > $(window).width()) {
        //此时width等于所有li的宽度总和
        $ulContainer
            .css('width', width)
            .parent().css('overflow-x', 'scroll');
        // console.log($(window).width());


    }
    //a点击注册事件
    var $newsTitle = $('.news-title');
    $('#news .nav-pills a').on('click', function() {
        //获取当前点击的元素
        var $this = $(this);
        //获取对应的title值
        var title = $this.data('title');
        //将title设置到相应的位置
        $newsTitle.text(title);
    });

    //1.获取手指在轮播图元素上的滑动方向（左右）

    //获取界面上的轮播图容器
    var $carousels = $('.carousel');
    var startX, endX;
    var offset = 50;
    //注册滑动事件
    $carousels.on('touchstart', function(e) {
        //手指触摸开始时记录一下手指所在的坐标X
        // console.log(e.originalEvent.touches[0].clientX);
        startX = e.originalEvent.touches[0].clientX;
        console.log(startX);
    });

    $carousels.on('touchmove', function(e) {
        //结束触摸一瞬间记录左后手指所在的坐标X
        // console.log(e.originalEvent.touches[0].clientX);
        endX = e.originalEvent.touches[0].clientX;
    });

    $carousels.on('touchend', function(e) {
        //比较大小
        console.log(endX);
        //控制精度
        //获取每次运动的距离，当距离大于一定值时认为是有方向变化
        var distance = Math.abs(startX - endX);
        console.log(distance);
        if (distance > offset) {
            //有方向变化
            //2.根据获得到的方向选择上一张或者下一张
            $(this).carousel(startX > endX ? 'next' : 'prev');
        }
    });



});