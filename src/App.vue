<template>
  <div id="app">
    <div class="tab">
      <router-link class="tab-item" to="/myMusic">我的</router-link>
      <router-link class="tab-item" to="/search">搜索</router-link>
      <router-link class="tab-item" to="more">更多</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  .tab {
    display: flex;
    .tab-item {
      flex: 1;
      color: red;
      text-align: center;
      height:5rem;
      line-height:5rem;
      font-size: 2rem;
    }
  }
</style>
