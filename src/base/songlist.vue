<template>
  <div class="musicList" v-show="songs" ref="songList">
    <ul>
      <li class="musicItem" v-for="(song,index) in songs" @click="selectItem(song,index)">
        <img :src="song.image" alt="">
        <div class="name">
          <span class="musicName">{{song.name}}</span><br>
          <span class="singerName">{{song.singer}}</span>
        </div>
        <a class="del" @click.stop="delSong(song,index)" href="javascript:;" v-show="playlist.length">删除</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default{
    props: {
      songs: {
        type:　Array,
        default: []
      }
    },
    computed:{
      ...mapGetters([
        'fullScreen',
        'playlist',
        'playing'
      ])
    },
    methods:{
      selectItem(song,index){
        this.$emit('select', song, index)
      },
      initBottom(){
        const bottom = this.playlist.length > 0 ? '3.5rem' : ''
        this.$refs.songList.style.marginBottom = bottom
      },
      delSong(song,index){
        this.$emit('delSong',song,index)
      }
    },
    mounted(){
      this.initBottom()
    },
    watch:{
      fullScreen(){
        this.initBottom()
      }
    }
  }
</script>

<style lang="less" scoped="">
  .musicList {
    flex: 8;
    overflow: auto;
    .musicItem {
      display: flex;
      border-bottom: 1px solid grey;
      line-height: 3.5rem;
      height: 3.5rem;
      /* flex: 0 0 4rem; */
      align-items: center;
      & > img {
        max-width: 2.5rem;
        max-height: 2.5rem;
        margin-left: 1rem;
        margin-right: .5rem;
        vertical-align: middle;
        flex: 0 0 2.5rem;
      }
      .name {
        color: grey;
        width: 14rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        vertical-align: middle;
        line-height: 1rem;
        flex: 1;
        .musicName{
          color: #000;
          font-size: .8rem;
        }
        .singerName{
          font-size: .7rem;
        }
      }
      .del {
        right: 2rem;
        font-size: .8rem;
        text-decoration: none;
        color: red;
        flex: 0 0 3rem;
        text-align: center;
      }

    }
  }
</style>
