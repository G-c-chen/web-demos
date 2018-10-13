window.onload = function() {
    // 1.顶部搜索
    search();
    // 2.轮播图
    banner();
    // 3.倒计时
    downTime();
};

var search = function() {
    // 1.默认固定顶部透明背景
    // 

    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var height = banner.offsetHeight;
    // 监听页面滚动事件
    window.onscroll = function() {
        // console.log(document.documentElement.scrollTop);
        // console.log(document.body.scrollTop);
        // console.log(window.pageYOffset);
        var scrollTop = document.documentElement.scrollTop;
        // console.log(scrollTop);
        // 默认的透明度
        var opacity = 0;
        if (scrollTop < height) {
            //2.当页面滚动的时候---随着页面卷曲的高度变大透明度变大
            opacity = scrollTop / height * 0.85;
        } else {
            // 3.当页面滚动的时候---超过某一个高度的时候透明度不变
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')'
    }
};

var banner = function() {
    // 1.自动轮播且无缝 定时器,过渡
    // 2.点要随着图片的轮播改变 根据索引切换
    // 3.滑动效果  利用touch事件完成
    // 4.滑动结束的时候  如果滑动的距离不超过某个值  吸附回去  过渡
    // 5.滑动结束的时候  如果滑动的距离超过某个值  切换(上/下一张) 根据滑动的方向, 过渡

    // 轮播图
    var banner = document.querySelector('.jd_banner');
    // 屏幕的宽度
    var width = banner.offsetWidth;
    // 图片容器
    var imageBox = banner.querySelector('ul:first-child');
    // 点容器
    var pointBox = banner.querySelector('ul:last-child');
    // 所有的点
    var points = pointBox.querySelectorAll('li');

    var addTransition = function() {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webKitTransition = 'all 0.2s';
    };
    var reomveTransition = function() {
        imageBox.style.transition = 'none';
        imageBox.style.webKitTransition = 'none';
    };
    var setTranslateX = function(translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webKitTransform = 'translateX(' + translateX + 'px)';
    };

    // 程序的核心  index
    var index = 1;
    var timer = setInterval(function() {
        index++;
        // 加过渡
        addTransition();
        // 做位移
        setTranslateX(-index * width);

    }, 2000);
    // 需要等最后一张动画结束取判断 是否瞬间定位到第一张
    imageBox.addEventListener('transitionend', function() {
        // console.log('ok');
        // 自动滚动的无缝
        if (index >= 9) {
            index = 1;
            // 瞬间定位
            // 清除过渡
            reomveTransition();

            // 做位移
            setTranslateX(-index * width);

        }
        // 滑动的时候也需要无缝衔接
        else if (index <= 0) {
            index = 8;
            // 瞬间定位
            // 清除过渡
            reomveTransition();

            // 做位移
            setTranslateX(-index * width);
        }
        // 根据索引设置点
        // 此时此刻 index 的取值范围1-8
        // 点的索引 index-1
        setPonit();
    });
    // 设置点的方法

    var setPonit = function() {
        // index 1-8
        // 清除样式
        points.forEach(function(item, index) {
            item.classList.remove('now');
        });
        // 给对应的加上样式
        points[index - 1].classList.add('now');
    };
    // 绑定事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    imageBox.addEventListener('touchstart', function(e) {
        // 清除定时器
        clearInterval(timer);
        // 记录起始位置的x坐标
        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function(e) {
        // 记录滑动过程当中的x坐标
        var moveX = e.touches[0].clientX;
        // 计算位移 有正负方向
        distanceX = moveX - startX;
        // 计算目标元素额位移 不用管正负
        // 元素将要的定位 等于 当前定位加上位移(手指移动的距离)
        var translateX = -index * width + distanceX;
        // 滑动  ---> 元素随着手指的滑动做位置的改变
        reomveTransition();
        setTranslateX(translateX);
        isMove = true;
    });

    imageBox.addEventListener('touchend', function(e) {
        if (isMove) {
            // 4 , 5 的实现
            // 要使用移动的距离
            if (Math.abs(distanceX) <= width / 3) {
                // 4.滑动结束的时候  如果滑动的距离不超过某个值  吸附回去  过渡
                addTransition();
                setTranslateX(-index * width);
            } else {
                // 5.滑动结束的时候  如果滑动的距离超过某个值  切换(上/下一张) 根据滑动的方向, 过渡
                // 右滑动 上一张
                if (distanceX > 0) {
                    index--;

                } else {
                    // 左滑动 下一张
                    index++;
                }
                // 根据index取做动画的移动
                addTransition();
                setTranslateX(-index * width);
            }
        }
        // 最好做一次参数的重置
        startX = 0;
        distanceX = 0;
        isMove = false;
        // 加上定时器
        clearInterval(timer);
        timer = setInterval(function() {
            index++;
            // 加过渡
            addTransition();
            // 做位移
            setTranslateX(-index * width);

        }, 2000);
    });
}
var downTime = function() {
    // 倒计时的时间
    var time = 2 * 60 * 60;
    // 时间盒子
    var spans = document.querySelector('.sk_time').querySelectorAll('span');
    // 每一秒去 更新显示的时间
    var timer = setInterval(function(){
        time--;
        // 格式还是秒 转换格式
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if(time <= 0){
            clearInterval(timer);
        }
    },1000);
};