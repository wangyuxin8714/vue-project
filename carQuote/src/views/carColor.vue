<template>
    <div class="wrap">
        <div class="color">
            <p @click="goImg">全部颜色</p>
            <div>
                <p>
                    <span v-for="(item,index) in carColor" :key="index"
                    :class="{active:index===ind}"
                    @click="colorTab(index)"
                    >{{item.year}}</span>
                </p>
                <ul>
                    <li @click="colorSelects(item.ColorId,item.Name)" v-for="(item,index) in carColor[ind].colorArr" :key="index">
                        <span :style="{background:item.Value}"></span>
                        {{item.Name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {mapState,mapActions,mapMutations} from "vuex"

export default Vue.extend({
    name: "carColor",
    data(){
        return {
            ind:0
        }
    },
    computed:{
        ...mapState({
            carColor:(state:any)=>state.img.carColor
        })
    },
    methods:{
        ...mapMutations({
            nameSave:"img/nameSave"
        }),
        ...mapActions({
            colorSelect:"img/colorSelect",
            getImgList:"img/getImgList"
        }),
        // 颜色tab切换
        colorTab(ind:any){
            this.ind=ind
        },
        // 点击颜色，获取对应的数据，返回图片页
        async colorSelects(id:any,name:any){
            let data=await this.colorSelect({
                SerialID: this.$route.params.id,
                ColorID: id
            })
            // 保存颜色名
            this.nameSave(name)
            if(data.code===1){
                this.$router.replace({name:"img",params:{id:this.$route.params.id}})
            }
        },
        // 点击全部颜色，获取全部数据，返回图片页
        async goImg(){
            this.nameSave("全部颜色")
            let id:any=window.sessionStorage.getItem("SerialID")
            let data=await this.getImgList(id)
            if(data.code===1){
                this.$router.replace({name:"img",params:{id}})
            }
        },
    },
    created(){
        this.ind=0
    }
})
</script>

<style scoped lang="scss">
.wrap{
    width: 100%;
    height: 100%;
}
.color{
    width: 100%;
    height: 100%;
    background: #f4f4f4;
    padding-top: .15rem; 
    >p{
        margin-bottom: .15rem;;
        font-size: .34rem;
        color: #00afff;
        background: #fff;
        text-align: center;
        line-height: .8rem;
        height: .8rem;
    }
    >div{
        p{
            margin-top: .15rem;
            padding-left: .2rem;
            font-size: .3rem;
            line-height: .76rem;
            height: .76rem;
            background: #fff;
            overflow-x: scroll;
            span{
                padding-right: .42rem;
            }
        }
        ul{
            margin-top: .15rem;
            padding: 0 .2rem;
            overflow: hidden;
            background: #fff;
        }
        li{
            float: left;
            width: 3.45rem;
            font-size: .32rem;
            line-height: .68rem;
            border: 1px solid #3aacff;
            box-sizing: border-box;
            margin: .2rem 0;
            border-radius: .05rem;
            span{
                display: inline-block;
                width: .4rem;
                height: .4rem;
                margin-left: .2rem;
                vertical-align: -12%;
                // background: #fe9210;
                box-sizing: border-box;
                border: 1px solid #818181;
            }
        }
        li:nth-child(odd) {
            margin-right: .2rem;
        }
    }
}
.active{
    color: #00afff;
}
</style>