<template>
    <div class="wrap">
        <div class="car_img">
            <div class="tit">
                <p>
                    <span>颜色</span>
                </p>
                <p>
                    <span>车款</span>
                </p>
            </div>
            <div class="img_cont">
                <ul v-for="(item) in imgList" :key="item.Id">
                    <li v-for="(val,index) in item.List" :key="index">
                        <img 
                            :src="val.Url" 
                         alt="">
                         <p v-if="index===0">
                             <span>{{item.Name}}</span>
                             <span>{{item.Count}}张></span>
                         </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState} from "vuex"


export default Vue.extend({
    props:{

    },
    components:{

    },
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            imgList:(state:any)=>state.img.imgList
        })
    },
    methods:{

    },
    created(){
        console.log(this.imgList)
    },
    mounted(){

    }
})
</script>

<style scoped lang="scss">
.wrap{
    width: 100%;
    height: 100%;
}
.car_img{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
}
.tit{
    position: fixed;
    background: #fff;
    top: 0;
    width: 100%;
    height: .8rem;
    align-items: center;
    -webkit-box-align: center;
    box-sizing: border-box;
    z-index: 99;
    display: flex;
    p{
        flex: 1;
        text-align: center;
        box-sizing: border-box;
        color: #454545;
        display: inline-block;
        text-align: center;
        span{
            max-width: 2.6rem;
            display: inline-block;
            vertical-align: middle;
            line-height: 1.25;
            font-size: .28rem;
        }
    }
    p:after{
        content: "";
        display: inline-block;
        padding-top: .16rem;
        padding-right: .16rem;
        border-top: 2px solid #ccc;
        border-right: 2px solid #ccc;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        margin-left: .2rem;
        vertical-align: 5%;
    }
}
.img_cont{
    position: fixed;
    top: .98rem;
    left: 0;
    height: 100%;
    overflow-y: scroll;
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
                span{
                    font-size: .28rem;
                    color: #f4f4f4;
                }
            }
        }
    }
}
</style>