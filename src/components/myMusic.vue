<template>
  <song-list :songs="songs" @select="select" @delSong = "delSong" @scrollDone="getMoreMusic">

  </song-list>
</template>

<script>
  import {getMusicList,getRandomId} from '../api/getMusicList'
  import {createSong} from '../api/song'
  import songList from '@/base/songlist'
  import {mapActions,mapMutations,mapGetters} from 'vuex'
  const song_num = 15

  export default {
    data () {
      return {
        musicState: false,
        songs: [],
        song_begin: 0,
        song_num: song_num,
        hasMore: true,
        topid: -1
      }
    },
    computed: {
      ...mapGetters([
          'playlist',
          'playing'
      ])
    },
    methods: {
      select(song,index){
        this.selectPlay({
          list: this.songs,
          index
        })
      },
      delSong(song,index){
        this.deleteSong(song)
      },
      _getMusicList() {
        this.hasMore = true
        getMusicList(this.song_begin,this.song_num,this.topid).then( (res) => {
          this.songs = this._normalizeSongs(res.songlist)
          this.setPlayList(this.songs);
          this._checkMore(res.total_song_num)
        })
      },
      getMoreMusic(){
        if(!this.hasMore){
          return
        }
        this.song_begin = this.song_begin + this.song_num;
        getMusicList(this.song_begin,this.song_num,this.topid).then( (res) => {
          this.songs = this.songs.concat(this._normalizeSongs(res.songlist))
          this.setPlayList(this.songs);
          this._checkMore(res.total_song_num)
        })
      },
      _checkMore(totalNum){
        if(totalNum <= this.songs.length ){
          this.hasMore = false;
        }else{
          this.hasMore = true
        }
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach( (item) => {
          let {data} = item
          if(data.songid && data.albumid) {
            ret.push(createSong(data))
          }
        })
        return ret
      },
      _getTopId(){
        getRandomId().then( (res) => {
          if(this.topid === -1){
            this.topid = res;
          }
        }).then( () => {
          this._getMusicList()
        })
      },
      ...mapMutations({
        setPlayList:'SET_PLAYINGLIST'
      }),
      ...mapActions([
        'selectPlay',
        'deleteSong'
      ])
    },
    watch:{
      playlist(newList){
        if(!newList){
          return
        }
        this.songs = newList.slice()
      }
    },
    mounted() {
      this._getTopId() //得到歌曲列表
    },
    components: {
      songList
    }
  }
</script>

<style lang="less">

</style>
