<template>
  <div class="wrap">
    <div class="list">
      <div v-for="(item,index) in listData" :key="index" ref="secList">
        <h6>{{index}}</h6>
        <ul>
          <li v-for="(val,ind) in item" :key="ind" @click="drawerFlag(val.MasterID)">
            <img v-lazy="val.CoverPhoto">
            <span>{{val.Name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="navlist"
      @touchstart="touchstart"
      @touchmove="touchmove"
      @touchend="touchend"
      ref="spelling"
    >
      <span>#</span>
      <span v-for="(item,key,index) in listData" :key="index">{{key}}</span>
    </div>
    <p v-if="showFlag" class="showList">{{current}}</p>
    <my-CarList :styles="styles"></my-CarList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BScroll from "better-scroll";
import { mapActions, mapState } from "vuex";
import myCarList from "@/components/carList.vue";

export default Vue.extend({
  name: "home",
  components: {
    myCarList
  },
  data() {
    return {
      flag: false,
      sec: null,
      styles: {
        width: "0"
      },
      showFlag: false,
      current: ""
    };
  },
  computed: {
    ...mapState({
      listData: (state: any) => state.index.listData
    })
  },
  methods: {
    ...mapActions({
      getListData: "index/getListData",
      getCarList: "index/getCarList"
    }),
    async drawerFlag(id: any) {
      let data: any = await this.getCarList(id);
      if (data.code === 1) {
        let obj: { width: string } = {
          width: "75%"
        };
        this.styles = obj;
      }
    },
    touchstart(e: any) {
      this.showFlag = true;
      this.touchmove(e);
    },

    touchmove(e: any) {
      let dataLength = this.$refs.spelling.children.length;
      let pageY = e.touches[0].pageY;
      let letterHeight = ((0.4 * window.innerWidth) / 750) * 100;
      let letterOffsetTop =
        (window.innerHeight - letterHeight * dataLength) / 2;
      let letterIndex = Math.floor((pageY - letterOffsetTop) / letterHeight);
      // 处理上边界
      if (letterIndex < 0) {
        letterIndex = 0;
      }
      // 处理下边界
      if (letterIndex > dataLength - 1) {
        letterIndex = dataLength - 1;
      }
      this.current = this.$refs.spelling.children[letterIndex].innerHTML;
      this.sec.scrollToElement(this.$refs.secList[letterIndex - 1], 200);
    },

    touchend(e: any) {
      this.showFlag = false;
      this.current = "";
    }
  },
  mounted() {
    this.$bus.$on("width", (obj: any) => {
      this.styles = obj;
    });
  },
  created() {
    this.$nextTick(() => {
      this.getListData();
      this.sec = new BScroll(".wrap", {
        probeType: 3,
        click: true
      });
    });
  }
});
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .list {
    width: 100%;
    h6 {
      font-size: 0.28rem;
      line-height: 0.4rem;
      background: #f4f4f4;
      padding-left: 0.3rem;
      color: #aaa;
      font-weight: 400;
    }
    ul {
      li {
        width: 92%;
        height: 1rem;
        margin: 0 auto;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 0.8rem;
          margin-right: 20px;
        }
        span {
          flex: 1;
          font-size: 16px;
        }
      }
      li:last-child {
        border: 0;
      }
    }
  }
}
.navlist {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  span {
    display: inline-block;
    line-height: 0.4rem;
    flex: 1;
    font-size: 12px;
    text-align: center;
    line-height: 0.4rem;
    color: #aaa;
    padding-left: 0.3rem;
  }
}
.showList {
  width: 50px;
  height: 50px;
  background: #aaa;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-radius: 50%;
}
</style>
