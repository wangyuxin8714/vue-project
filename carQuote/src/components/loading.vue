<template>
  <div class="maskLoading">
    <div class="dailogLoading">
      <img src="/img/timg.gif" alt>
      <p>加载中...</p>
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
.maskLoading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
  .dailogLoading {
    width: 30%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.8);
    color: #fff;
    border-radius: 5px;
    padding: 0 5px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
        width: 100%;
    }
    p{
        width: 100%;
        text-align: center;
        height: 30px;
        font-size:16px;
        line-height: 30px;
    }
  }
}
</style>