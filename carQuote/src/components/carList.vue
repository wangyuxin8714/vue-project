<template>
    <div :style="styles" class="drawer"
        @touchstart='touchStart'
        @touchmove='touchMove'
    >
        <div class="car_list"
        v-for="(item) in carList" :key="item.GroupId"
        >
            <h3>{{item.GroupName}}</h3>
            <dl v-for="(val) in item.GroupList" :key="val.SerialID" 
            @click="goDetail(val.SerialID)"
            >
                <dt>
                    <img :src="val.Picture" alt="">
                </dt>
                <dd>
                    <h4>{{val.AliasName}}</h4>
                    <p>{{val.DealerPrice}}</p>
                </dd>
            </dl>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState,mapActions} from "vuex"

export default Vue.extend({
    props:["styles"],
    computed:{
        ...mapState({
            carList:(state:any)=>state.index.carList
        })
    },
    data(){
        return {
            startloca:0
        }
    },
    methods:{
        ...mapActions({
            getCarDetail: "detail/getCarDetail"
        }),
        async goDetail(id:any){
            let data=await this.getCarDetail(id)
            if(data.code===1){
                this.$router.push("/cardetail")
            }
        },
        touchStart(e:any){
            this.startloca=e.touches[0].clientX
        },
        touchMove(e:any){
            if(e.touches[0].clientX-this.startloca>50){
                this.$bus.$emit("width",{width:"0",transition: "all .2s ease-in-out"})
            }
        }
    },
    created(){
    },
    mounted(){
    },
})
</script>

<style scoped lang="scss">
.drawer{
    position: fixed;
    top: 0;
    right: 0;
    transition: all .2s ease;
    background: #fff;
    z-index: 100;
    height: 100%;
    box-shadow: 0 0 0.5rem #eee;
    overflow-y: scroll;
    .car_list{
        width: 100%;
        h3{
            margin-left: 1px;
            font-size: .28rem;
            line-height: .48rem;
            background: #f2f2f2;
            padding-left: .3rem;
            color: #717171;
        }
        dl{
            height: 1.4rem;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            display: flex;
            align-items: center;
            dt{
                margin: 0 .1rem 0 .2rem;
                width: 1.8rem;
                height: 1.2rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            dd{
                h4{
                    font-size: .34rem;
                    color: #5f687a;
                }
                p{
                    margin-top: .1rem;
                    font-size: .28rem;
                    color: red;
                }
            }
        }
    }
}
</style>