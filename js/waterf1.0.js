/*  ���캯��  ͼƬ�ٲ���  */
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
        //1 �����µ�li ��������߶�  �ŵ���̵�ul��
        this.getLi();
    //    2 ͼƬ�ӳټ���
        this.lazyImg();
    //    3 �ص�����
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
                var PosImg = utils.offset(cur).top; // ͼƬ���붥��
                var scrollT = utils.win('scrollTop');
                var clientH = utils.win('clientHeight');
                if(scrollT+clientH>PosImg){
                    var oimg=new Image;
                    oimg.src=cur.getAttribute('realImg')
                    oimg.onload = function () {
                        cur.src=this.src;
                        cur.parentNode.style.height=cur.offsetHeight+'px'; // �仯��߶�
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
                var nowT =scrollT-_this.step; // ���ڸ��µ�scrollTop
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
            var bodyH = document.body.offsetHeight; // body �߶�
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