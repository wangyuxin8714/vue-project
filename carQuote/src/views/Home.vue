<template>
  <div class="wrap">
    <div class="list">
      <div v-for="(item,index) in listData" :key="index" ref="secList">
        <h6>{{index}}</h6>
        <ul>
          <li v-for="(val,ind) in item" :key="ind" @click="drawerFlag(val.MasterID)">
            <img :src="val.CoverPhoto">
            <span>{{val.Name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="navlist">
      <span @click="firstTab">#</span>
      <span
        v-for="(item,key,index) in listData"
        :key="index"
        @click="floorTab(index)"
      >{{key}}</span>
    </div>
    <my-CarList v-if="flag"></my-CarList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import myCarList from "@/components/carList.vue";
import BScroll from "better-scroll";

export default Vue.extend({
  name: "home",
  components: {
    myCarList
  },
  data() {
    return {
      flag: false,
      sec: null,
    };
  },
  computed: {
    ...mapState({
      listData: (state: any) => state.homes.listData
    })
  },
  methods: {
    ...mapActions({
      getListData: "homes/getListData"
    }),
    drawerFlag(id) {
      this.flag = true;
    },
    floorTab(index) {
      let child: any = this.$refs.secList;
      this.sec.scrollToElement(child[index], 200);
    },
    firstTab(){
      this.sec.scrollToElement(this.$refs.secList[0], 200);
    }
  },
  created() {
    this.getListData();

    this.$nextTick(() => {
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
        height: 1rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          height: 0.8rem;
          // border-radius: 50%;
          margin: 0 20px;
        }
        span {
          flex: 1;
          font-size: 15px;
        }
      }
    }
  }
}
.navlist {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 5px;
  top: 150px;
  span {
    flex: 1;
    font-size: 14px;
    text-align: center;
    line-height: 20px;
    &.active{
      color: #aaa;
    }
  }
}
</style>
