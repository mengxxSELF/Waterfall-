/* �ٲ��� es6 jq*/

class Water{
    constructor(opt){
        this.$el =opt.el;
        this.step = opt.step||30; // ����
        this.$ul=this.$el.children('ul');
        this.$back=$('.back');
        this.$aimgs =null;
        this.init();

    }

    init(){
        //1 �����µ�li ��������߶�  �ŵ���̵�ul��
        this.getLi();
        //    2 ͼƬ�ӳټ���
        this.lazyImg();
        //    3 �ص�����
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
            var PosImg =cur.offset().top; // ͼƬ���붥��
            var scrollT = $(document).scrollTop(); // �ĵ������߶�
            var clientH = $(window).height(); // ��Ļ�߶�
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
            var scrollT = $(document).scrollTop(); // �ĵ������߶�
            var clientH = $(window).height(); // ��Ļ�߶�
            var bodyH = $(document).height();// �ĵ��߶�

            if(scrollT+clientH>bodyH-40){
                this.getLi(); // ����������
            }
            this.lazyImg();
            // ���ض�����ť ����
            if(scrollT>clientH){
                this.$back.fadeIn()
            }else{
                this.$back.fadeOut()
            }


        })
    }
}