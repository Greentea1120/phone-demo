




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


function setScreenAnimate(screenCls){

    var screen = document.querySelector(screenCls);     //获取当前屏的元素

    var animateElements = screenAnimateElements[screenCls];     //需要设置动画的元素

    var isSetAnimateClass = false;      //是否有初始化子元素的样式

    var isAnimateDone = false;      //当前屏幕下所有子元素的状态是done?

    screen.onclick = function(){
        //初试化样式,增加init A A-init
        if(isSetAnimateClass === false) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute(('class'));
                console.log(animateElements.length)
                element.setAttribute('class', baseCls + ' ' + animateElements[i].substr(1) + '-animate-init');
                isSetAnimateClass = true;

            }
            return;
        }
        //切换所有 animateElements 的 init -> done   A A-done
        if(isAnimateDone === false) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute(('class'));

                element.setAttribute('class', baseCls.replace('-animate-init','-animate-done'));

                isAnimateDone = true;

            }
            return;
        }
        //切换所有 animateElements 的 done -> init   A A-done
        if(isAnimateDone === true) {
            for (var i = 0; i < animateElements.length; i++) {
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute(('class'));

                element.setAttribute('class', baseCls.replace('-animate-done','-animate-init'));
                isAnimateDone = false;

            }
            return;
        }
    }
}

for(k in screenAnimateElements){
    setScreenAnimate(k)
}
