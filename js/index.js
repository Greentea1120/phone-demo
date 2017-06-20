/**
 * Created by wangyukun on 2017/6/19.
 */
// 获取元素

var getElem = function (selector) {
    return document.querySelector(selector);
}

var getAllElem = function (selector) {
    return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls = function (element) {
    return element.getAttribute('class');
}

// 设置元素样式
var setCls = function (element,cls) {
    return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+ " " + cls);
    }
}

//为元素删除样式
var delCls = function (element, cls) {
    var baseCls = getCls(element);
    if (baseCls.indexOf(cls) !== -1){
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
}

// 第一步:初始化样式 init
var screenAnimateElements = {

    '.screen-1':[
        '.screen-1-heading',
        '.screen-1-phone',
        '.screen-1-shadow'
    ],
    '.screen-2':[
        '.screen-2-heading',
        '.screen-2-subheading',
        '.screen-2-phone',
        '.screen-2-point-i-1',
        '.screen-2-point-i-2',
        '.screen-2-point-i-3'
    ],
    '.screen-3':[
        '.screen-3-heading',
        '.screen-3-phone',
        '.screen-3-subheading',
        '.screen-3-features'
    ],
    '.screen-4':[
        '.screen-4-heading',
        '.screen-4-subheading',
        '.screen-4-type-item-i-1',
        '.screen-4-type-item-i-2',
        '.screen-4-type-item-i-3',
        '.screen-4-type-item-i-4'
    ],
    '.screen-5':[
        '.screen-5-heading',
        '.screen-5-subheading',
        '.screen-5-bg'
    ]
}

// 设置屏内元素为初始状态
var setScreenAnimateInit = function (screenCls) {
    var screen = document.querySelector(screenCls);     //获取当前屏的元素
    var animateElements = screenAnimateElements[screenCls];     //需要设置动画的元素

    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute(('class'));
        element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '-animate-init');
    }
}
// 设置播放屏内的元素动画
var playScreenAnimateDone = function (screenCls) {
    var screen = document.querySelector(screenCls);     //获取当前屏的元素
    var animateElements = screenAnimateElements[screenCls];     //需要设置动画的元素
    for (var i = 0; i < animateElements.length; i++) {
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute(('class'));
        element.setAttribute('class', baseCls.replace('-animate-init','-animate-done'));
    }
}
window.onload = function () {
    for(k in screenAnimateElements){
        if(k === '.screen-1'){
            continue;
        }
        setScreenAnimateInit(k)
    }
}

//第二步: 滚动到哪里,播放到哪里
var navItems = getAllElem('.header-nav-item');
var outlineItems = getAllElem('.outline-item');

var switchNavItemsActive = function (idx) {
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header-nav-item-active')
    }
    addCls(navItems[idx],'header-nav-item-active')

}

window.onscroll = function () {
    var top = document.body.scrollTop;
    // console.log(top);

    if(top > 80){
        addCls(getElem('.header'),'header-status-black');
        addCls(getElem('.outline'),'outline-status-in');
    }else{
        delCls(getElem('.header'),'header-status-black');
        delCls(getElem('.outline'),'outline-status-in');
        switchNavItemsActive(0)
    }


    if (top >= 0){
        playScreenAnimateDone('.screen-1')
        switchNavItemsActive(0)
    }
    if (top > 800*1 -100){
        playScreenAnimateDone('.screen-2')
        switchNavItemsActive(1)
    }
    if (top > 800*2 -100){
        playScreenAnimateDone('.screen-3')
        switchNavItemsActive(2)
    }
    if (top > 800*3 -100){
        playScreenAnimateDone('.screen-4')
        switchNavItemsActive(3)
    }
    if (top > 800*4 -100){
        playScreenAnimateDone('.screen-5')
        switchNavItemsActive(4)
    }
}
// 第三步双向定位

var setNavJump = function(i,lib){
    var item = lib[i];
    item.onclick= function(){
        document.body.scrollTop = i*800;
    }
}
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
    setNavJump(i,outlineItems);
}
// 第四步 滑动门特效

var navTip = getElem('.header-nav-tip');
var setTip = function(idx,lib){
    console.log(1)
    lib[idx].onmouseover = function () {
        // console.log(this,idx);
        navTip.style.left = (idx*70) + 'px';
    }
    var activeIdx = 0;
    lib[idx].onmouseout = function () {
        // console.log(this,idx);
        for(var i=0;i<lib.length;i++){
            console.log(1)
            if(getCls(lib[i]).indexOf('header-nav-item-active') > -1){
                console.log('?')
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = (activeIdx*70) + 'px';

    }

}
for(var i=0;i<navItems.length;i++){
    setTip(i,navItems);
}

// 小优化

setTimeout(function () {
    playScreenAnimateDone('.screen-1');
},500)









