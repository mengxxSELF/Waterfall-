/*  构造函数  图片瀑布流  */
function Water(opt){
    this.el =opt.el;
    this.step = opt.step||40;
    this.aUl = this.el.getElementsByTagName('ul')
    this.aimgs = this.el.getElementsByTagName('img')
    this.oBack = document.getElementsByClassName('back')[0];
    this.timer=null;
    this.stop=false;
    this.init();
}
Water.prototype={
    constructor:'Water',
    init: function () {
        //1 加载新的li 给入随机高度  放到最短的ul中
        this.getLi();
    //    2 图片延迟加载
        this.lazyImg();
    //    3 回到顶部
        this.back();
        this.scroll();
    },
    getLi: function () {
        for(var i=0;i<30;i++){
            var oLi = document.createElement('li')
            oLi.innerHTML = '<img realImg=imgs/'+utils.rnd(1,17) +'.jpg  />';
            oLi.style.height = utils.rnd(100,180)+'px';
            var domAry = utils.makeArray(this.aUl).sort(function (a,b) {
                return a.offsetHeight-b.offsetHeight;
            });
            domAry[0].appendChild(oLi);
        }
    },
    lazyImg:function(){
        var _this =this;
        for(var i=0;i<this.aimgs.length;i++){
            (function (index) {
                var cur = _this.aimgs[index];
                if(cur.flag) return;
                var PosImg = utils.offset(cur).top; // 图片距离顶部
                var scrollT = utils.win('scrollTop');
                var clientH = utils.win('clientHeight');
                if(scrollT+clientH>PosImg){
                    var oimg=new Image;
                    oimg.src=cur.getAttribute('realImg')
                    oimg.onload = function () {
                        cur.src=this.src;
                        cur.parentNode.style.height=cur.offsetHeight+'px'; // 变化里高度
                        oimg=null;
                        cur.flag=true;
                    }
                }
            })(i)
        }
    },
    back: function () {
        var _this = this;
        this.oBack.onclick = function () {
            clearInterval(_this.timer);
            _this.timer =setInterval(function () {
                var scrollT =  utils.win('scrollTop' );
                var nowT =scrollT-_this.step; // 现在更新的scrollTop
                if(scrollT<=0){
                    clearInterval(_this.timer);
                    nowT =0;
                }
                utils.win('scrollTop',nowT );
                _this.stop = false;
            },40)
        }
    },
    scroll:function(){
        var _this =this;
        window.onscroll= function () {
            if(_this.stop) {
                clearInterval(_this.timer);
            };
            _this.stop = true;

            var scrollT = utils.win('scrollTop');
            var clientH = utils.win('clientHeight');
            var bodyH = document.body.offsetHeight; // body 高度
            if(scrollT+clientH>=bodyH-50){
                _this.getLi();
            }
            _this.lazyImg();
            if(scrollT > clientH){
                _this.oBack.style.display='block';
            }else{
                _this.oBack.style.display='none';
            }
        }
    }
}