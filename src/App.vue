<template>
  <div id="app">
    <div class="musicHeader">
      <div class="top">
        I Want You
      </div>
      <div class="tab">
        <router-link class="tab-item" to="/myMusic">我的</router-link>
        <router-link class="tab-item" to="/search">搜索</router-link>
        <router-link class="tab-item" to="more">更多</router-link>
      </div>
    </div>
    <router-view></router-view>
    <bottom></bottom>
  </div>
</template>

<script>
  import bottom from './components/bottom'
  export default {
    name: 'app',
    components: {
      bottom
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }
</style>
<style lang="less" scoped>
  .musicHeader{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    /*flex: 1;*/
  }
  .top {
    text-align: center;
    background-color: black;
    color: yellow;
    line-height: 5rem;
    font-size: 2rem;
  }

  .tab {
    display: flex;
    background: #000;
    .tab-item {
      flex: 1;
      /*color: red;*/
      text-align: center;
      color: yellow;
      text-decoration: none;
      height: 5rem;
      line-height: 5rem;
      font-size: 2rem;
    }
  }

  .musicBody{
    padding-top: 10rem;
  }
</style>
