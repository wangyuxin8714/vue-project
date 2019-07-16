<template>
  <div class="mask">
    <div class="province">
      <div class="location">
        <p>自动定位</p>
        <p>{{cityStr}}</p>
      </div>
      <div class="list">
        <p>省市</p>
        <ul>
          <li>安徽</li>
        </ul>
      </div>
    </div>
    <div class="city"></div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";

export default Vue.extend({
  props: ["cityStr"],
  computed: {},
  created() {},
  mounted() {}
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
}
</style>