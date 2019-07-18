<template>
  <div class="mask">
    <div class="dailog">
      <img src="/img/q-icon.png" alt>
      <h4>询价成功</h4>
      <p>
        <span>稍后有专业汽车顾问为你服务</span>
        <span>请保持手机畅通</span>
      </p>
      <button @click="$emit('trueBtn')">确定</button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapMutations } from "vuex";

export default Vue.extend({
  props: ["dialog"],
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
    width: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    img {
      width: 0.8rem;
      display: block;
      margin: 0.3rem auto ;
    }
    h4 {
        text-align: center;
      font-size: 0.4rem;
      color: #3cc144;
      margin: 0.1rem;
      font-weight: normal;
    }
    p {
      text-align: center;
      font-size: 0.24rem;
      color: silver;
      margin: 0.15rem;
      span {
        display: block;
      }
    }
    button {
      width: 100%;
      height: 0.8rem;
      margin-top: 0.3rem;
      outline: none;
      border: 0;
      font-size: 0.3rem;
      line-height: 0.8rem;
      color: #3aacff;
      background: #fff;
      border-top: 1px solid #f4f4f4;
    }
  }
}
</style>