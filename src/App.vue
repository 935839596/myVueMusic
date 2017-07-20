<template>
  <div id="app">
    <div class="wrap">
      <!--顶部-->
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

      <!--歌曲列表-->
      <router-view></router-view>

      <!--底部播放栏-->
      <bottom></bottom>

    </div>
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
  #app, .wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .musicHeader {
    flex: 1;
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
        &.router-link-active{
          border-bottom: 5px solid yellow;
        }
      }
    }
  }

</style>
