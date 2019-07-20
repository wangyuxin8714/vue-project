<template>
    <div class="wrap">
        <div class="car_img">
            <div class="tit">
                <p @click="goColor">
                    <span v-if="name">{{name}}</span>
                    <span v-else>颜色</span>
                </p>
                <p @click="goCarModel">
                    <span v-if="carModel">{{carModel}}</span>
                    <span v-else>车款</span>
                </p>
            </div>
            <div class="img_cont">
                <ul v-for="(item) in imgList" :key="item.Id">
                    <li v-for="(val,index) in item.List" :key="index">
                        <img  @click="imgDetailShow(item.Id,index,item.Count)"
                            v-lazy="val.Url" 
                         alt="">
                         <p v-if="index===0" @click="imgListFlag(item.Id)">
                             <span>{{item.Name}}</span>
                             <span>{{item.Count}}张></span>
                         </p>
                    </li>
                </ul>
            </div>
            <div v-if="flag" class="img_list" ref="img" @scroll="upscroll">
                <ul >
                    <li v-for="(val,index) in imgAllList.List" :key="index" >
                        <img @click="imgShow(index,imgAllList.Count)"
                            v-lazy="val.Url" 
                         alt="">
                    </li>
                </ul>
            </div>
            <div class="swiper-container img_detail" ref="img_detail" v-if="imgflag">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" 
                    v-for="(val,index) in imgAllList.List" :key="index">
                        <li class="lis" @click="imgDetailHead">
                            <img v-lazy="val.Url" alt="">
                        </li>
                    </div>
                </div>
                <span>{{num}}/{{count}}</span>
                <button @click="goQuestion(carDetail.list[0].car_id)">询最低价</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState,mapActions} from "vuex"
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

export default Vue.extend({
    name: "imgs",
    data(){
        return {
            flag:false,
            imgflag:false,
            page:1,
            pageSize:30,
            id:0,
            num:0,
            count:0,
        }
    },
    computed:{
        ...mapState({
            imgList:(state:any)=>state.img.imgList,
            imgAllList:(state:any)=>state.img.imgAllList,
            name:(state:any)=>state.img.name,
            carModel:(state:any)=>state.img.carModel,
            carDetail:(state:any)=>state.detail.carDetail
        })
    },
    methods:{
        ...mapActions({
            getAllImgList:"img/getAllImgList",
            getColor:"img/getColor"
        }),
        // 轮播图的隐藏
        imgDetailHead(){
            this.imgflag=false;
        },
        // 点击详情列表，轮播图的显示
        async imgDetailShow(id:any,ind:any,count:any){
            const that=this
            let data=await this.getAllImgList({
                SerialID: this.$route.params.id||window.sessionStorage.getItem("SerialID"),
                ImageID: id,
                Page: 1,
                PageSize: this.pageSize,
                CarID: this.$route.params.carid||0
            })
            if(data.code===1){
                this.imgflag=true;
                this.$nextTick(()=>{
                    let mySwiper=new Swiper(".img_detail",{
                        observer:true,
                        on: {
                            slideChangeTransitionEnd: function(){
                                // 获取轮播当前图片的对应下标
                                that.num=mySwiper.activeIndex+1
                                if(mySwiper.activeIndex+1===(that.pageSize*that.page-5)){
                                    that.page+=1
                                    that.getAllImgList({
                                        SerialID: that.$route.params.id||window.sessionStorage.getItem("SerialID"),
                                        ImageID: that.imgAllList.ID,
                                        Page: that.page,
                                        PageSize: that.pageSize,
                                        CarID: that.$route.params.carid||0
                                    })
                                }
                            },
                        },
                    })
                    this.num=ind+1
                    this.count=count
                    // 显示当前下标对应的图片
                    mySwiper.slideTo(ind,0)
                })
            }
        },
        // 跳转询问页
        goQuestion(id:any){
            this.$router.replace({name:"question",params:{id}})
        },
        // 点击初始列表，轮播图的显示
        imgShow(ind:any,count:any){
            const that=this
            this.imgflag=true;
            this.$nextTick(()=>{
                let mySwiper=new Swiper(".img_detail",{
                        observer:true,
                        on: {
                            slideChangeTransitionEnd: function(){
                                // 获取轮播当前图片的对应下标
                                that.num=mySwiper.activeIndex+1
                                if(mySwiper.activeIndex+1===25){
                                    that.page+=1
                                    that.getAllImgList({
                                        SerialID: that.$route.params.id||window.sessionStorage.getItem("SerialID"),
                                        ImageID: that.imgAllList.ID,
                                        Page: that.page,
                                        PageSize: that.pageSize,
                                        CarID: that.$route.params.carid||0
                                    })
                                }
                            },
                        },
                    })
                this.num=ind+1
                this.count=count
                // 显示当前下标对应的图片
                mySwiper.slideTo(ind,0)
            })
        },
        // 上拉加载
        upscroll(){
            // 获取视口的高度
            let clientHeight:any = document.documentElement.clientHeight || document.body.clientHeight;
            // 获取滚动的距离
            let scrollT:any=this.$refs.img.scrollTop;
            // 获取滚动元素的高度
            let scrollHeight:any = this.$refs.img.scrollHeight;
            if(scrollT+clientHeight+0.5>=scrollHeight){
                this.page++;
                this.getAllImgList({
                    SerialID: this.$route.params.id||window.sessionStorage.getItem("SerialID"),
                    ImageID: this.id,
                    Page: this.page,
                    PageSize: this.pageSize,
                    CarID: this.$route.params.carid||0
                })
            }
        },
        // 图片详情列表的显示 
        async imgListFlag(id:any){
            this.page=1
            let data=await this.getAllImgList({
                SerialID: this.$route.params.id||window.sessionStorage.getItem("SerialID"),
                ImageID: id,
                Page: 1,
                PageSize: this.pageSize,
                CarID: this.$route.params.carid||0
            })
            if(data.code===1){
                this.flag=true;
                this.id=id
            }
        },
        // 跳转颜色选择页获取数据
        async goColor(){
            let id:any=window.sessionStorage.getItem("SerialID")
            let data=await this.getColor(id)
            if(data.code===1){
                this.$router.replace({name:"color",params:{id}})
            }
        },
        // 跳转车款选择页
        goCarModel(){
            this.$router.replace({name:"type"})
        }
    },
    created(){
        this.flag=false;
        this.imgflag=false
    }
})
</script>
<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
}
.car_img {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
}
.tit {
  position: fixed;
  background: #fff;
  top: 0;
  width: 100%;
  height: 0.8rem;
  align-items: center;
  -webkit-box-align: center;
  box-sizing: border-box;
  z-index: 99;
  display: flex;
  p {
    height: 100%;
    line-height: 0.6rem;
    -webkit-box-flex: 1;
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    color: #454545;
    span {
      max-width: 2.6rem;
      display: inline-block;
      vertical-align: middle;
      line-height: 1.25;
      font-size: 0.28rem;
    }
  }
  p:after {
    content: "";
    display: inline-block;
    padding-top: 0.16rem;
    padding-right: 0.16rem;
    border-top: 2px solid #ccc;
    border-right: 2px solid #ccc;
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
    margin-left: 0.2rem;
    vertical-align: 5%;
  }
}
.img_cont {
  position: fixed;
  top: 0.98rem;
  left: 0;
  height: 100%;
  overflow-y: scroll;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.08rem;
    flex-wrap: wrap;
    li {
        width: 2.46rem;
        height: 2.46rem;
        margin-bottom: 2px;
        position: relative;
        img {
        width: 100%;
        height: 100%;
        }
      
        p{
            position: absolute;
            top: 0;
            left: 0;
            width: 2.46rem;
            height: 2.46rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(56,90,130,.5);
            z-index: 999;
            span{
                font-size: .28rem;
                color: #f4f4f4;
            }
        }
    }
  }
}
.img_list{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100000;
    overflow-y: scroll;
    background: #fff;
    ul{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: .08rem;
        flex-wrap: wrap;
        li{
            width: 2.46rem;
            height: 2.46rem;
            margin-bottom: 2px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
}
.img_detail{
    background: #000;
    top: 0;
    text-align: center;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999999;
    .swiper-slide{
        height: 100%;
        position: relative;
        .lis{
            width: 100%;
            height: 95%;
            display: -webkit-box;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            text-align: center;
            img{
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
            }
        }
    }
    span{
        display: inline-block;
        bottom: .2rem;
        font-size: .22rem;
        position: absolute;
        color: #fff;
        z-index: 99;
    }
    button{
        position: absolute;
        color: #fff;
        z-index: 9999999999;
        font-size: .24rem;
        padding: .08rem .15rem;
        right: .1rem;
        bottom: .1rem;
        background-color: #3aacff;
        border: none;
    }
}
</style>