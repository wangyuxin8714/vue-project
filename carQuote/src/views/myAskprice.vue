<template>
  <div class="wrap">
    <div class="wrap_header">
      <header class="header_head">
        <p>可向商家咨询最低价,商家及时回复</p>
        <img src="/img/wen.png" alt>
      </header>
      <div class="header_content">
        <div class="content_imgPic">
          <img :src="questionObj.details.serial.Picture" alt>
          <div class="content_imgPic_rig">
            <p>{{questionObj.details.serial.AliasName}}</p>
            <p>{{questionObj.details.market_attribute.year}}款 {{questionObj.details.car_name}}</p>
          </div>
        </div>
        <div class="content_confirm">
          <p>个人信息</p>
          <ul>
            <li>
              <span>姓名</span>
              <input type="text" placeholder="输入你的真实中文姓名" maxlength="4">
            </li>
            <li>
              <span>手机</span>
              <input type="text" placeholder="输入你的真实手机姓名" maxlength="11">
            </li>
            <li @click="cityClick">
              <span>城市</span>
              <span>{{cityName}}</span>
            </li>
          </ul>
          <div class="confim_btn">
            <button>询最低价</button>
          </div>
        </div>
        <div class="content_carType">
          <p>选择报价经销商</p>
          <ul>
            <li v-for="(item,index) in questionObj.list" :key="index" :class="{active:item.flag}" @click="sigleChoose(item.flag,index)">
              <p class="carType_first">
                <span>{{item.dealerShortName}}</span>
                <b>{{item.promotePrice.slice(0,item.promotePrice.indexOf(".")+1)}}万</b>
              </p>
              <p class="carType_second">
                <span>{{item.address}}</span>
                <span>售{{item.saleRange}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <footer class="wrap_foot">
        <button>询最低价</button>
      </footer>
    </div>

    <my-chooseCity v-if="showCity"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapMutations } from "vuex";
import myChooseCity from "@/components/chooseCIty.vue";

export default Vue.extend({
  name: "myAskprice",
  components: { myChooseCity },
  data() {
    return {
      cityName: "北京"
    };
  },
  computed: {
    ...mapState({
      questionObj: (state: any) => state.question.questionObj,
      showCity: (state: any) => state.question.showCity
    })
  },
  methods: {
    ...mapActions({
      getQuestionData: "question/getQuestionData"
    }),
    ...mapMutations({
      changeShowCity: "question/changeShowCity",
      changeFlag:"question/changeFlag"
    }),
    //点击城市出现选择城市
    cityClick() {
      this.changeShowCity(true);
    },
    //点击圆圈选中与否
    sigleChoose(flag,index){
      this.changeFlag({flag,index});
    }
  },
  created() {
    //接收城市id与城市名称
    this.$bus.$on("getCity", (res: any) => {
      this.getQuestionData({
        carId: this.$route.params.id,
        cityId: res.id
      });
      this.cityName = res.name;
    });
  },
  mounted() {
    //默认获取数据渲染
    this.getQuestionData({
      carId: this.$route.params.id,
      cityId: "201"
    });
  }
});
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  .wrap_header {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header_head {
      height: 0.6rem;
      line-height: 0.6rem;
      width: 100%;
      background: #79cd92;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 99;
      p {
        color: #fff;
        font-size: 0.3rem;
      }
      img {
        width: 0.3rem;
        margin-left: 0.1rem;
      }
    }
    .header_content {
      flex: 1;
      width: 100%;
      height: auto;
      background: #f4f4f4;
      overflow-y: scroll;
      margin-top: 0.6rem;
      .content_imgPic {
        background: #fff;
        padding: 0 0.24rem;
        height: 2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        img {
          width: 2.3rem;
          height: 1.41rem;
          border: 1px solid #eee;
          box-sizing: border-box;
          border-radius: 5px;
        }
        .content_imgPic_rig {
          margin-left: 0.2rem;
          flex: 1;
          p:first-child {
            font-size: 0.38rem;
            margin-bottom: 15px;
          }
          p:last-child {
            font-size: 0.3rem;
          }
        }
      }
      .content_imgPic:before {
        content: "";
        display: inline-block;
        padding-top: 0.16rem;
        padding-right: 0.16rem;
        border-top: 2px solid #ccc;
        box-sizing: border-box;
        border-right: 2px solid #ccc;
        transform: rotate(45deg);
        position: absolute;
        right: 0.26rem;
        top: 43%;
      }
      .content_confirm {
        p {
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
          padding: 0 0.2rem;
          box-sizing: border-box;
          li {
            font-size: 0.32rem;
            height: 0.88rem;
            line-height: 0.88rem;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            color: #000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 0.32rem;
              color: #000;
            }
            input {
              font-size: 0.32rem;
              padding-right: 0.2rem;
              box-sizing: border-box;
              outline: none;
              border: 0;
              width: 88%;
              text-align: right;
              box-sizing: border-box;
              color: #555;
            }
          }
          li:last-child span:last-child {
            margin-right: 0.2rem;
          }
          li:last-child span:last-child::after {
            content: "";
            display: inline-block;
            padding-top: 0.16rem;
            padding-right: 0.16rem;
            border-top: 1px solid silver;
            border-right: 1px solid silver;
            transform: rotate(45deg);
          }
        }
        .confim_btn {
          background: #fff;
          text-align: center;
          padding-bottom: 0.28rem;
          box-sizing: border-box;
          line-height: 1rem;
          button {
            font-size: 0.32rem;
            color: #fff;
            width: 80%;
            background: #3aacff;
            height: 0.7rem;
            border-radius: 0.1rem;
            outline: none;
            border: 0;
          }
        }
      }
      .content_carType {
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
          padding: 0 0.18rem;
          box-sizing: border-box;
          li {
            position: relative;
            padding: 0.26rem 0 0.26rem 0.54rem;
            border-bottom: 1px solid #eee;
            box-sizing: border-box;
            height: 1.65rem;
            p {
              display: flex;
              align-items: center;
              justify-content: space-between;
            }
            .carType_first {
              font-size: 0.3rem;
              b {
                font-size: 0.24rem;
                color: red;
              }
            }
            .carType_second {
              margin-top: 0.1rem;
              font-size: 0.24rem;
              color: #a2a2a2;
              span:first-child {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
              }
              span:last-child {
                width: 0.8rem;
                text-align: center;
                margin-left: 1.5rem;
                font-size: 0.22rem;
              }
            }
          }
          li:before {
            content: "";
            display: inline-block;
            width: 0.32rem;
            height: 0.32rem;
            border-radius: 50%;
            border: 2px solid #ccc;
            box-sizing: border-box;
            position: absolute;
            left: 0.05rem;
            top: 50%;
            transform: translate3d(0, -50%, 0);
          }
          li.active:before {
            background: #3aacff;
            border: none;
          }
          li:after {
            content: "";
            display: inline-block;
            padding-top: 0.17rem;
            padding-right: 0.1rem;
            border: 2px solid #fff;
            transform: rotate(40deg) translate3d(0, -50%, 0);
            position: absolute;
            left: 0.07rem;
            border-left: none;
            border-top: none;
            top: 47%;
          }
        }
      }
    }
  }
  .wrap_foot {
    width: 100%;
    button {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      background: #3aacff;
      text-align: center;
      font-size: 0.34rem;
      color: #fff;
      outline: none;
      border: 0;
    }
  }
}
</style>
