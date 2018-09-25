$(function() {
    //    初始化 fullpage 组建
    //1.设置每一个屏幕的背景颜色
    //2.设置屏幕内容的对齐方式，默认是垂直居中的，改成顶部对齐
    //3.设置导航 设置指示器 点容器
    //4.监听进入某一屏的时候
    $('.container').fullpage({
        //配置参数
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,
        navigation: true,
        afterLoad: function(link, index) {
            //index 序号 1开始 当前屏的序号
            // console.log(index);
            $('.section').eq(index - 1).addClass('now');
        },
        //离开某一个页面色时候触发
        onLeave: function(index, nextIndex, direction) {
            if (index == 2 && nextIndex == 3) {
                //    当前是从第二页到第三页
                $('.section').eq(index - 1).addClass('leaved');
                // console.log("ok");
            } else if (index == 3 && nextIndex == 4) {
                //    当前是从第三页到第四页
                $('.section').eq(index - 1).addClass('leaved');
            } else if (index == 5 && nextIndex == 6) {
                //    当前是从第五页到第六页
                $('.section').eq(index - 1).addClass('leaved');
                $('.screen06 .box').addClass('show');
            } else if (index == 6 && nextIndex == 7) {

                //    当前是从第六页到第七页
                // var tal = 0;    
                $('.screen07 .star img').each(function(i, item) {
                    // img display:none;
                    $(this).delay(i * 0.5 * 1000).fadeIn();
                    // tal = i;
                });
                $('.screen07 .text').addClass('show');
                // $('.screen07 .text.show').css('transition-delay',tal*0.5+'s');
            }
        },
        //    最好在组建初始化完毕或者插件内容渲染完毕
        afterRender: function() {
            // console.log(this);
            // this没有api方法

            // jquery 插件初始的时候封装这个方法
            //1. 回想jquery插件的封装 $.fn.fullpage = function(){}
            // 2.jquery 本身没有的方法通过 $.fn 的方式追加方法  认为是插件的方法


            //    点击更多切换下一页
            $('.more').on('click', function() {
                $.fn.fullpage.moveSectionDown();
            });
            //当第四屏的购物车动画结束之后执行收货地址的动画
            $('.screen04 .cart').on('transitionend', function() {
                // console.log('过度结束了');
                $('.screen04 .address').fadeIn(200).find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });

            // 第八屏功能
            // 1.手跟着鼠标移动
            $('.screen08').on('mousemove', function(e) {
                $(this).find('.hand').css({
                    left: e.clientX - 190,
                    top: e.clientY - 20
                });
            }).find('.again').on('click', function() {
                // 2.点击再来一次重置动画跳回第一页
                // 动画怎么进行的
                // 2.1 添加 now 类
                // 2.2 添加 leaved 类
                // 2.3 添加 show 类
                $('.now,.leaved,.show').removeClass('now')
                    .removeClass('leaved').removeClass('show');
                // 2.4 加 css 属性 后果：加一个style属性
                // 2.5 加jquery 方法 show（）fadeIn() 后果：加一个style属性
                 $('.content [style]').removeAttr('style');

                 // 回到第一页
                 $.fn.fullpage.moveTo(1);

            });




        },
        //页面切换的时间
        scrollingSpeed: 1000
    });
});