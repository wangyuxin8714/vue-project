<template>
  <div class="mask">
      <div class="dailog">
          <h3>{{dialog}}</h3>
          <p @click="$emit('goodBtn')">好</p>
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
.mask{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0,0,0,.3);
    z-index: 200;
    .dailog{
        width: 70%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        background: #fff;
        border-radius: 5px;
        h3{
            height: 60px;
            font-weight: normal;
            border-bottom: 1px solid #ccc;
            font-size: 14px;
            text-align: center;
            line-height: 60px;
        }
        p{
            height: 50px;
            font-size: 18px;
            color: #007aff;
            text-align: center;
            line-height: 50px;
        }
    }
}
</style>