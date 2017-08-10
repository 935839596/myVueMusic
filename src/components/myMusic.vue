<template>
  <song-list :songs="songs" @select="select" @delSong = "delSong">

  </song-list>
</template>

<script>
  import {getMusicList} from '../api/getMusicList'
  import {createSong} from '../api/song'
  import songList from '@/base/songlist'
  import {mapActions,mapMutations,mapGetters} from 'vuex'


  export default {
    data () {
      return {
        musicState: false,
        songs: []
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
        getMusicList().then( (res) => {
          this.songs = this._normalizeSongs(res.songlist)
        })
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
    created(){
        this._getMusicList()
    },
    components: {
      songList
    }
  }
</script>

<style lang="less">

</style>
