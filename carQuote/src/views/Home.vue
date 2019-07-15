<template>
  <div class="wrap">
    <my-CarList :styles="styles"></my-CarList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import myCarList from "@/components/carList.vue";
import { mapActions } from "vuex";

export default Vue.extend({
  name: 'home',
  data(){
      return {
        styles:{
          width:'0'
        }
      }
  },
  components: {
    myCarList
  },
  methods:{
    ...mapActions({
      getCarList:"index/getCarList"
    }),
    tab(){
      let obj:{width:string}={
        width:'75%'
      }
      this.styles=obj
    },
  },
  created(){
    this.getCarList(236)
  }
});
</script>
<style>

</style>

