<template>
  <div class="wrap">
    <header class="wrap_header">
      <span
        :class="{active:index === ind}"
        v-for="(item,index) in yearData"
        :key="index"
        @click="tabYear(index)"
      >{{item}}</span>
    </header>
    <div class="content" v-for="(item,index) in carlist" :key="index">
      <p>{{item.title}}</p>
      <ul>
        <li
          v-for="(val) in item.contlist"
          :key="val.car_id"
          @click="goToQuestion(val.car_id,val.tit)"
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
  props: [],
  data() {
    return {
      carlist: [],
      yearData: JSON.parse(window.localStorage.getItem("yearData")),
      ind: 0
    };
  },
  computed: {},
  created() {
    this.filterList(0);
  },
  mounted() {},
  methods: {
    //过滤数据
    filterList(ind: Number) {
      const list:any = JSON.parse(window.localStorage.getItem("carlist"));
      this.carlist = list.filter((item:any) => {
        item.contlist = item.contlist.filter(
          (val:any) => val.year === this.yearData[ind]
        );
        if (item.contlist.length > 0) {
          return item;
        } else {
          return;
        }
      });
    },
    goToQuestion(id: any, tit: any) {
      this.$router.push({ name: "question", params: { id } });
      this.$bus.$emit("getType", { id, tit });
    },
    tabYear(ind: number) {
      this.ind = ind;
      this.filterList(ind);
    }
  }
});
</script>

<style scoped lang="scss">
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  header.wrap_header {
    height: 0.76rem;
    margin-top: 0.15rem;
    padding-left: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.76rem;
    background: #fff;
    box-sizing: border-box;
    span {
      padding-right: 0.42rem;
      box-sizing: border-box;
    }
    span.active {
      color: #00afff;
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
          }
          span:last-child {
            color: #818181;
            text-align: center;
            margin-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>