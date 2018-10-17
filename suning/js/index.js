$(function() {
    /* 手势切换轮播图*/
    /*1.自动轮播 无缝*/
    /*2.点随着变化*/
    /*3.完成手势切换*/
    var $banner = $('.sn_banner');
    var width = $banner.width();
    // console.log(width);
    var $imageBox = $banner.find('ul:first');
    var $pointBox = $banner.find('ul:last');
    var $points = $pointBox.find('li');

    var animationFuc = function() {
        $imageBox.animate({ transform: 'translateX(' + (-index * width) + 'px)' }, 200, function() {
            // 动画执行完成的回调

            if (index >= 9) {
                index = 1;
                // 瞬间完成
                $imageBox.css({ transform: 'translateX(' + (-index * width) + 'px)' });
            } else if (index <= 0) {
                index = 8;
                // 瞬间完成
                $imageBox.css({ transform: 'translateX(' + (-index * width) + 'px)' });
            }
            /*2.点随着变化*/
            $points.removeClass('now').eq(index - 1).addClass('now');
        });
    }

    /*1.自动轮播 无缝*/
    var index = 1;
    var timer = setInterval(function() {
        index++;
        // 动画
        animationFuc();
    }, 3000);
    /*3.完成手势切换*/
    /*左滑的手势 下一张*/
    $banner.on('swipeLeft', function() {
        clearInterval(timer);
        index++;
        animationFuc();
        timer = setInterval(function() {
            index++;
            // 动画
            animationFuc();
        }, 3000);
    });
    /*右滑的手势 上一张*/
    $banner.on('swipeRight', function() {
        clearInterval(timer);
        index--;
        animationFuc();
        timer = setInterval(function() {
            index++;
            // 动画
            animationFuc();
        }, 3000);
    });

});