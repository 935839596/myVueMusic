<template>
  <div class="player" v-show="this.initPlaylist">
    <div class="normalPlayer" v-show="fullScreen">
      <div class="background">
        <img :src="currentSong.image" alt="">
      </div>
      <div class="header">
        <div class="back" @click="back()"></div>
        <span class="songName">{{currentSong.name}}</span><br>
        <span class="singerName">{{currentSong.singer}}</span>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cdWraper">
            <div class="cd" :class="cdRotate">
              <img :src="currentSong.image" alt="">
            </div>
          </div>
        </div>

      </div>
      <div class="bottom">
        <div class="progress-wrapper">
          <span class="time time-l">{{formate(currentTime)}}</span>
          <div class="progress-bar-wrapper">
            <progress-bar :percent = 'percent' @percentChange="onProgressBarChange"></progress-bar>
          </div>
          <span class="time time-r">{{formate(currentSong.duration)}}</span>
        </div>
        <div class="operators">
          <div class="prev" @click="prev"></div>
          <div :class="play" @click="tooglePlaying"></div>
          <div class="next" @click="next"></div>
        </div>

      </div>
    </div>

    <div class="miniPlayer" v-show="!fullScreen" @click="open">
      <div class="icon" :class="cdRotate"><img :src="currentSong.image" alt=""></div>
      <div class="text">
        <span class="name">{{currentSong.name}}</span><br>
        <span class="singerName">{{currentSong.singer}}</span>
      </div>
      <div class="controls">
        <div :class="play" @click.stop="tooglePlaying"></div>
      </div>
    </div>

    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import progressBar from '@/base/progress-bar'

  export default {
    data(){
      return {
        songReady: false,
        currentTime: 0
      }
    },
    computed: {
      play(){
        return this.playing ? 'play' : 'pause'
      },
      cdRotate(){
        return this.playing ? 'play' : 'play pause'
      },
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      ...mapGetters([
        'currentIndex',
        'fullScreen',
        'currentSong',
        'playing',
        'playlist',
        'initPlaylist'
      ])
    },
    methods: {
      back(){
        this.setFullScreen(false)
      },
      open(){
        this.setFullScreen(true)
      },
      tooglePlaying(){
        if (!this.songReady) {
          return;
        }
        this.setPlayingState(!this.playing)
      },
      prev(){
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex - 1
        if (index === -1) {
          index = this.playlist.length - 1
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.tooglePlaying()
        }
        this.songReady = false;
      },
      next(){
        if (!this.songReady) {
          return;
        }
        let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        this.setCurrentIndex(index)
        if (!this.playing) {
          this.tooglePlaying()
        }
        this.songReady = false;
      },
      ready(){
        this.songReady = true
      },
      error(){
        this.songReady = true;
      },
      updateTime(e){
        this.currentTime = e.target.currentTime;
      },
      end(){
        this.next()
      },
      onProgressBarChange(percent){
        this.$refs.audio.currentTime = this.currentSong.duration * percent;
        if(!this.playing){
          this.tooglePlaying()
        }
      },
      formate(interval){
        interval = interval | 0 // 向下取整
        const minute = this._pad(interval / 60 | 0)
        const second = this._pad(interval % 60)
        return `${minute}:${second}`
      },
      _pad(num, n = 2){
        let len = num.toString().length;
        while(len < n){
          num = '0' + num
          len ++
        }
        return num;
      },
      ...mapMutations({
        setFullScreen: 'SET_FULLSCREEN',
        setPlayingState: 'SET_PLAYING_STATE',
        setCurrentIndex: 'SET_CURRENT_INDEX'
      })

    },
    watch: {
      currentSong(newSong, oldSong){
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      playing(newPlaying){
        const audio = this.$refs.audio
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause()
        })
      }
    },
    components:{
      progressBar
    }
  }
</script>

<style lang="less">
  html, body {
    height: 100%;
    overflow: hidden;
  }

  .normalPlayer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: black;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      opacity: 0.6;
      -webkit-filter: blur(20px);
      filter: blur(20px);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .header {
      text-align: center;
      height: 4rem;
      color: white;
      position: relative;
      span {
        line-height: 2rem;
        display: inline-block;
        height: 2rem;
      }
      .back {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background-image: url("../image/back.png");
        width: 1rem;
        height: 1rem;
        background-size: cover;
      }
      .songName {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1.3rem;
        line-height: 2rem;
        height: 2rem;
      }
      .singerName {
        width: 70%;
        margin: 0 auto;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        font-size: 1rem;
        line-height: 1.5rem;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 5rem;
      bottom: 7rem;
      white-space: nowrap;
      font-size: 0;
      .middle-l {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
        .cdWraper {
          position: absolute;
          left: 10%;
          top: 0;
          width: 80%;
          height: 100%;
          .cd {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 1rem solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            &.play {
              animation: rotate 20s linear infinite;
            }
            &.pause {
              animation-play-state: paused;
            }
            img {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
        }
      }

    }
    .bottom {
      position: absolute;
      bottom: 1.5rem;
      width: 100%;
      text-align: center;
      .progress-wrapper {
        display: flex;
        color: white;
        width: 80%;
        margin: 0 auto;
        .time{
          display: inline-block;
          font-size: .8rem;
          line-height: 2rem;
          height: 2rem;
        }
        .time-l {
          flex: 0 0 3rem
        }
        .progress-bar-wrapper {
          display: inline-block;
          flex: 1;
        }
        .time-r {
          flex: 0 0 3rem;
        }
      }
      .operators {
        div {
          display: inline-block;
          width: 30%;
          height: 4rem;
          background-size: 30%;
          background-repeat: no-repeat;
          background-position-x: 50%;
          background-position-y: 50%;
        }
        .prev {
          background-image: url("../image/prev.png");
        }
        .next {
          background-image: url("../image/next.png");
        }

        .play {
          background-image: url("../image/play.png");
        }
        .pause {
          background-image: url("../image/pause.png");
        }
      }
    }

  }

  .miniPlayer {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 3.5rem;
    background: #555;
    .icon {
      flex: 0 0 3rem;
      width: 3rem;
      height: 3rem;
      padding: 0 1rem 0 1rem;
      &.play {
        animation: rotate 20s linear infinite;
      }
      &.pause {
        animation-play-state: paused;
      }
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .text {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .name {
        color: yellow;
        font-size: .8rem;
      }
      .singerName {
        font-size: .7rem;
        color: white;
      }
    }
    .controls {
      flex: 0 0 2rem;
      margin-right: 1.5rem;
      width: 2rem;
      div {
        height: 1.8rem;
        width: 1.8rem;
        background-size: cover;
      }
      .play {
        background-image: url("../image/play.png");
      }
      .pause {
        background-image: url("../image/pause.png");
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }
  }

</style>
