<template>
  <div class="mask">
    <div class="province">
      <div class="location">
        <p>自动定位</p>
        <p>{{cityObj.CityName}}</p>
      </div>
      <div class="list">
        <p>省市</p>
        <ul>
          <li
            v-for="item in allCity"
            :key="item.CityID"
            @click="goToCity(item.CityID)"
          >{{item.CityName}}</li>
        </ul>
      </div>
    </div>
    <div class="city" v-if="cityFlag" @click="dialogClick">
      <ul>
        <li v-for="item in clickData" :key="item.CityID">{{item.CityName}}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default Vue.extend({
  props: [],
  data() {
    return {
      cityFlag: false
    };
  },
  computed: {
    ...mapState({
      allCity: (state: any) => state.question.allCity,
      cityObj: (state: any) => state.question.cityObj,
      clickData: (state: any) => state.question.clickData
    })
  },
  created() {
    //获取到全部的省份
    this.getAllCity();
    //获取定位城市
    this.getCityData();
  },
  mounted() {},
  methods: {
    ...mapActions({
      getAllCity: "question/getAllCity",
      getClickList: "question/getClickList",
      getCityData: "question/getCityData"
    }),
    ...mapMutations({
      changeShowCity: "question/changeShowCity"
    }),
    //点击省份
    goToCity(cityId: String) {
      this.cityFlag = true;
      this.getClickList({ provinceid: cityId });
    },
    //点击城市
    dialogClick(e: any) {
      if (e.target !== e.currentTarget) {
        const onlyObj = this.clickData.find(
          (item:any) => item.CityName === e.target.innerHTML
        );
        //传递城市id与城市名称
        this.$bus.$emit("getCity", {
          id: onlyObj.CityID,
          name: onlyObj.CityName
        });
        this.changeShowCity(false);
      } else {
        this.cityFlag = false;
      }
    }
  }
});
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: #fff;
  .province {
    height: 100%;
    overflow-y: scroll;
    .location {
      p:first-child {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        padding-left: 0.2rem;
        box-sizing: border-box;
        background: #f4f4f4;
      }
      p:last-child {
        padding-left: 0.4rem;
        box-sizing: border-box;
        font-size: 0.28rem;
        height: 0.8rem;
        line-height: 0.8rem;
        background: #fff;
      }
    }
    .list {
      p {
        height: 0.4rem;
        line-height: 0.4rem;
        font-size: 0.24rem;
        padding-left: 0.2rem;
        box-sizing: border-box;
        background: #f4f4f4;
      }
      ul {
        li {
          padding-left: 0.3rem;
          font-size: 0.28rem;
          height: 0.8rem;
          line-height: 0.8rem;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          margin-left: 0.1rem;
          position: relative;
        }
        li:after {
          content: "";
          display: inline-block;
          padding-top: 0.16rem;
          padding-right: 0.16rem;
          border-top: 1px solid #999;
          border-right: 1px solid #999;
          transform: rotate(45deg);
          position: absolute;
          right: 0.35rem;
          top: 0.3rem;
        }
      }
    }
  }
  .city {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 111;
    ul {
      width: 70%;
      height: 100%;
      overflow-y: scroll;
      background: #fff;
      position: absolute;
      right: 0;
      top: 0;
      li {
        padding-left: 0.3rem;
        font-size: 0.28rem;
        height: 0.8rem;
        line-height: 0.8rem;
        border-bottom: 1px solid #eee;
        box-sizing: border-box;
        margin: 0 0.1rem;
        box-sizing: border-box;
      }
    }
  }
}
</style>