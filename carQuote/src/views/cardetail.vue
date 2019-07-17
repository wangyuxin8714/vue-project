<template>
    <div class="wrap">
        <div class="banner" @click="goImg">
            <img :src="carDetail.CoverPhoto" alt="">
            <span>{{carDetail.pic_group_count}}张照片</span>
        </div>
        <div class="header">
            <div>
                <p>{{carDetail.market_attribute.dealer_price}}</p>
                <p>指导价{{carDetail.market_attribute.official_refer_price}}</p>
            </div>
            <button @click="goQuestion(carDetail.list[0].car_id)">询问底价</button>
        </div>
        <div class="car_list">
            <div class="c_tit">
                <span v-for="(item,index) in yearList" :key="index"
                :class="{active:index===ind}"
                @click="yearTab(index,item)"
                >{{item}}</span>
            </div>
            <div class="c_cont">
                <div v-for="(item,index) in carlist" :key="index">
                    <h3>{{item.title}}</h3>
                    <ul>
                        <li v-for="(val) in item.contlist" :key="val.car_id" >
                            <p>{{val.tit}}</p>
                            <p>{{val.title}}</p>
                            <p>
                                <span>指导价 {{val.dealer_price_max}}</span>
                                <span>{{val.dealer_price_min||"暂无"}}</span>
                            </p>
                            <button @click="goQuestion(val.car_id)">询问底价</button>
                        </li>
                    </ul>
                </div>
            </div>  
        </div>
        <div class="footer" @click="goQuestion(carDetail.list[0].car_id)">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState,mapMutations,mapActions} from "vuex"

export default Vue.extend({
    data(){
        return {
            ind:0
        }
    },
    computed:{
        ...mapState({
            carDetail:(state:any)=>state.detail.carDetail,
            carlist:(state:any)=>state.detail.carlist,
            yearList:(state:any)=>state.detail.yearList
        })
    },
    methods:{
        ...mapMutations({
            getYearTab:"detail/getYearTab"
        }),
        ...mapActions({
            getImgList:"img/getImgList",
            getCarDetail: "detail/getCarDetail"
        }),
        goQuestion(id:any){
            this.$router.push({name:"question",params:{id}})
        },
        yearTab(ind:any,name:any){
            this.ind=ind,
            this.getYearTab(name)
        },
        async goImg(){
            let data=await this.getImgList(this.carDetail.SerialID)
            if(data.code===1){
                this.$router.push({name:"img",params:{id:this.carDetail.SerialID}})
            }

        }
    },
    created(){
        let id=window.sessionStorage.getItem("SerialID")
        this.getCarDetail(id)
        this.getYearTab("全部")
    },
    mounted(){
    }
})
</script>
<style scoped lang="scss">
.wrap{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
}
.banner{
    width: 100%;
    height: 165px;
    position: relative;
    img{
        width: 100%;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        position: absolute;
    }
    span{
        position: absolute;
        bottom: .3rem;
        right: .3rem;
        color: #fff;
        padding: 1px .1rem;
        border-radius: .2rem;
        background: rgba(0,0,0,.6);
        font-size: .24rem;
    }

}
.header{
    padding: .36rem .2rem .3rem;
    background: #fff;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
        p:first-child{
            font-size: .36rem;
            color: red;
            font-weight: 500;
        }
        p:last-child{
            font-size: .26rem;
            color: silver;
            max-width: 3.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    button{
        width: 50%;
        border-radius: .1rem;
        font-size: .32rem;
        height: .7rem;
        border: none;
        box-sizing: border-box;
        background: #00afff;
        color: #fff;
    }
}
.car_list{
    .c_tit{
        border-top: .15rem solid #f4f4f4;
        padding: 0 .3rem;
        font-size: .32rem;
        height: .77rem;
        line-height: .77rem;
        background: #fff;
        span{
            padding-right: .46rem;
        }
        .active{
            color: #3aacff;
        }
    }
    .c_cont{
        h3{
            padding: 0 .2rem;
            height: .5rem;
            line-height: .5rem;
            font-size: .26rem;
            color: #999;
            background: #f4f4f4;
        }
        ul{
            background: #fff;
            li{
                padding: 0 .2rem;
                border-bottom: .18rem solid #f4f4f4;
                overflow: hidden;
                p{
                    padding: .26rem 0 .18rem;
                    font-size: .3rem;
                    line-height: 1;
                    color: #3d3d3d;
                }
                p:nth-child(2){
                    color: #bdbdbd;
                    font-size: .26rem;
                }
                p:nth-child(3){
                    text-align: right;
                    padding-bottom: .1rem;
                    font-size: .24rem;
                    color: #818181;
                    span{
                        text-align: right;
                        // padding-bottom: .1rem;
                        font-size: .24rem;
                        color: #818181;
                    }
                    span:last-child{
                        font-size: .3rem;
                        color: #ff2336;
                        margin-left: .1rem;
                    }
                }
                button{
                    border: none;
                    border-top: 1px solid #eee;
                    width: 110%;
                    height: .8rem;
                    font-size: .32rem;
                    color: #00afff;
                    background: #fff;
                    font-weight: 500;
                    margin-left: -.3rem;
                }
            }
        }
    }
}
.footer{
    position: fixed;
    width: 100%;
    bottom: 0;
    z-index: 99;
    background: #3aacff;
    height: 1rem;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
        font-size: .32rem;
        margin-top: .12rem;
        font-weight: 500;
    }
    P:last-child{
        font-size: .24rem;
    }
}


</style>