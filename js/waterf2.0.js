/* 瀑布流 es6 jq*/

class Water{
    constructor(opt){
        this.$el =opt.el;
        this.step = opt.step||30; // 步长
        this.$ul=this.$el.children('ul');
        this.$back=$('.back');
        this.$aimgs =null;
        this.init();

    }

    init(){
        //1 加载新的li 给入随机高度  放到最短的ul中
        this.getLi();
        //    2 图片延迟加载
        this.lazyImg();
        //    3 回到顶部
        this.back();
        this.scroll();
    }
    getLi(){
        for(let i=0;i<40;i++){
            let oLI = $('<li>').html(`<img realImg='imgs/${utils.rnd(1,17)}.jpg ' />`);
            oLI.css('height',utils.rnd(100,180) )
            let domAry = utils.makeArray(this.$ul).sort(function (a,b) {
                return a.offsetHeight-b.offsetHeight;
            })
            oLI.appendTo(domAry[0]);
        }
    }

    lazyImg(){
        this.$aimgs = this.$el.find('img');
        for(let i=0;i<this.$aimgs.length;i++){
            let cur = this.$aimgs.eq(i);
            if(cur.flag) return;
            var PosImg =cur.offset().top; // 图片距离顶部
            var scrollT = $(document).scrollTop(); // 文档滚动高度
            var clientH = $(window).height(); // 屏幕高度
            if(scrollT+clientH>PosImg){
                let oimg=new Image();
                oimg.src = cur.attr('realImg')
                oimg.onload = function () {
                    cur.attr('src',this.src)
                    cur.parent().css('height',cur.innerHeight())
                    oimg=null;
                    cur.flag=true;
                }
            }
        }
    }

    back(){
        this.$back.click(()=>{
            $('body,html').animate({
                scrollTop:0
            })
        })
    }
    scroll(){
        $(window).scroll(()=>{
            var scrollT = $(document).scrollTop(); // 文档滚动高度
            var clientH = $(window).height(); // 屏幕高度
            var bodyH = $(document).height();// 文档高度

            if(scrollT+clientH>bodyH-40){
                this.getLi(); // 加载新数据
            }
            this.lazyImg();
            // 返回顶部按钮 处理
            if(scrollT>clientH){
                this.$back.fadeIn()
            }else{
                this.$back.fadeOut()
            }


        })
    }
}