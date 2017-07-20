<template>
  <div class="bottom">
    <img class="musicPic" src="" alt="">
    <div class="music"></div>
    <div class="play">{{getMusicPlaying}}</div>
  </div>
</template>

<script>
  var store,state;

  export default{
    data (){
      return {

      }
    }
    ,
    computed: {
      //得到仓库中正在播放的音乐
      getMusicPlaying(){
        return this.$store.state.musicPlay
      },

      //音乐播放状态
      isPlaying(){
        return this.$store.state.musicPlayState;
      }
    },
    watch: {
      getMusicPlaying(){
        if(this.$store.state.musicPlayState){
          console.log(this.$store.state.musicPlay);
        }
      }
    },
    mounted () {

    }
  }
</script>

<style lang="less">
  html,body{
    height: 100%;
    overflow: hidden;
  }
  .bottom{
    flex: 1;
    display: flex;
    height: 10rem;
    background-color: black;
    .musicPic{
      flex: 2;
      width: 10rem;
      background-color: white;
    }
    .music{
      flex: 6;
      background-color: yellow;
    }
    .play{
      flex: 2;
      background-color: red;
    }
  }
</style>
