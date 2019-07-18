<template>
  <div class="wrap">
    <p @click="goImg">全部车款</p>
    <header class="wrap_header">
      <span v-for="(item,index) in yearData" :key="index"
      :class="{active:index===ind}"
      @click="yearTab(item,index)"
      >{{item}}</span>
    </header>
    <div class="content" v-for="(item,index) in carlist" :key="index">
      <p>{{item.title}}</p>
      <ul>
        <li v-for="(val) in item.contlist" :key="val.car_id"
        @click="selectCarModel(val.car_id,val.tit)"
        >
          <p class="carType_first">
            <span>{{val.tit}}</span>
            <b>{{val.dealer_price_min}}</b>
          </p>
          <p class="carType_second">
            <span>{{val.title}}</span>
            <span>指导价 {{val.dealer_price_max}}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapMutations } from "vuex";
export default Vue.extend({
  name: "type",
  data() {
    return {
      ind:0
    };
  },
  computed: {
    ...mapState({
      carlist:(state:any)=>state.detail.carlist,
      yearData:(state:any)=>state.detail.yearData,
    })
  },
  methods: {
    ...mapMutations({
      getYearTab:"detail/getYearTab",
      saveCarModel:"img/saveCarModel"
    }),
    ...mapActions({
      getImgList:"img/getImgList",
      getCarModelImg:"img/getCarModelImg",
    }),
    // 通过年份tab切换
    yearTab(year:any,ind:any){
      this.ind=ind
      this.getYearTab(year)
    },
    // 点击全部车款，获取全部数据，返回图片页
    async goImg(){
      this.saveCarModel("全部车款")
      let id:any=window.sessionStorage.getItem("SerialID")
      let data=await this.getImgList(id)
      if(data.code===1){
          this.$router.push({name:"img",params:{id}})
      }
    },
    // 点击车款，获取对应的数据，返回图片页
    async selectCarModel(carid:any,tit:any){
      let id:any=window.sessionStorage.getItem("SerialID")
      let data=await this.getCarModelImg({
        SerialID: id,
        CarID: carid
      })
      // 保存车款名
      this.saveCarModel(tit)
      if(data.code===1){
        this.$router.push({name:"img",params:{id,carid}})
      }

    }
  },
  created() {
    this.getYearTab(this.yearData[0])
  }
});
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: .15rem;
  background: #f4f4f4;
  >p{
    margin-bottom: .15rem ;
    font-size: .34rem;
    color: #00afff;
    background: #fff;
    text-align: center;
    line-height: .8rem;
    height: .8rem;
  }
  header.wrap_header {
    height: 0.76rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.76rem;
    background: #fff;
    box-sizing: border-box;
    span {
      padding-right: 0.42rem;
      box-sizing: border-box;
    }
  }
  .content {
    float: 1;
    > p {
      height: 0.5rem;
      line-height: 0.5rem;
      padding: 0 0.2rem;
      box-sizing: border-box;
      font-size: 0.24rem;
      color: #666;
      background: #eee;
    }
    ul {
      background: #fff;
      padding: 0 0.3rem;
      box-sizing: border-box;
      li {
        height: 1.4rem;
        padding: 0.28rem 0;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        p {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .carType_first {
          font-size: 0.3rem;
          span {
            width: 5rem;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
          b {
            font-weight: normal;
            font-size: 0.26rem;
            color: red;
          }
        }
        .carType_second {
          margin-top: 0.16rem;
          font-size: 0.2rem;
          span:first-child {
            flex: 1;
            color: #b3b3b3;
            display: inline-block;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: .24rem;
          }
          span:last-child {
            color: #818181;
            text-align: center;
            margin-left: 0.5rem;
            font-size: .24rem;
          }
        }
      }
    }
  }
}
.active{
  color: #00afff;
}
</style>