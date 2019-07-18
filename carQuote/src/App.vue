<template>
  <div id="app">
    <keep-alive include="home,cardetail">
      <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html,body,#app{
  width: 100%;
  height: 100%;
}

</style>
