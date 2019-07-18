<template>
  <div class="mask" @click="$emit('serverBtn')">
    <div class="dailog">
      <ol>
        <li>
          <img src="../../public/img/q-l.png" alt>
          <span>安全高效</span>
        </li>
        <li>
          <img src="../../public/img/q-m.png" alt>
          <span>省心省力</span>
        </li>
        <li>
          <img src="../../public/img/q-r.png" alt>
          <span>贴心服务</span>
        </li>
      </ol>
      <ul>
        <li>私人信息严格保密，最新报价立等可取</li>
        <li>足不出户，提交即可获得多家经销商的最低价格</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: [],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
});
</script>

<style scoped lang="scss">
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
  .dailog {
    width: 80%;
    position: absolute;
    left: 50%;
    top: 0.8rem;
    transform: translateX(-50%);
    background: #fff;
    border-radius: 0.15rem;
    ol {
      padding: 0.2rem 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      li {
        flex: 1;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
        img {
          width: 0.6rem;
          height: 0.6rem;
        }
        span {
          font-size: 0.24rem;
          color: #333;
        }
      }
    }
    ul {
      border-bottom-left-radius: 0.15rem;
      border-bottom-right-radius: 0.15rem;
      padding: 0.1rem 0;
      background: #f4f4f4;
      box-sizing: border-box;
      li {
        list-style: initial;
        margin-left: 0.5rem;
        font-size: 0.2rem;
        color: silver;
      }
    }
  }
  .dailog:before {
    position: absolute;
    content: "";
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 0.3rem solid transparent;
    border-right: 0.3rem solid transparent;
    border-bottom: 0.3rem solid #fff;
    right: 0.16rem;
    top: -0.15rem;
  }
}
</style>