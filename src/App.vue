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
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <!--底部播放栏-->
      <player></player>

    </div>
  </div>
</template>

<script>
  import player from './components/player'
  export default {
    name: 'app',
    components: {
      player
    },
    data(){
      return {
//        music:{}
      }
    },
    computed:{
      music(){
        return this.$store.state.music
      }
    },
    methods:{

    },
    beforeCreate(){

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
    .top {
      text-align: center;
      background-color: #333;
      color: yellow;
      line-height: 2rem;
      font-size: 1rem;
      display: none;
    }
    .tab {
      display: flex;
      background: #333;
      .tab-item {
        flex: 1;
        text-align: center;
        color: yellow;
        text-decoration: none;
        height: 2.5rem;
        line-height: 2.5rem;
        font-size: 1rem;
        &.router-link-active{
          border-bottom: .15rem solid yellow;
        }
      }
    }
  }

</style>
