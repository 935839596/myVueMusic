<template>
  <div class="suggest" @scroll="handleScroll" ref="suggest">
    <ul class="suggest-list" ref="suggestList">
      <li class="suggest-item" v-for="item in result" @click="clickToPlay(item)">
        <div class="icon"></div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {search} from '@/api/search'
  import {createSong} from '@/api/song'
  import {mapGetters,mapActions} from 'vuex'
  const perpage = 20

  export default {
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data(){
      return {
        page: 1,
        result: [],
        hasMore: true,
        loading: false
      }
    },
    computed: {
      ...mapGetters([
        'fullScreen',
        'playlist'
      ])
    },
    methods: {
      search(){
        this.hasMore = true
        search(this.query, this.page, false, perpage).then((res) => {
          if (res.code === 0) {
            this.result = this._getResult(res.data)
            this._checkMore(res.data);
          }
        })
      },
      searchMore(){
        if (!this.hasMore) {
          return
        }
        if(this.loading){
          return
        }
        this.loading = true;
        this.page++
        search(this.query, this.page, false, perpage).then( (res) => {
          if(res.code === 0){
            this.result = this.result.concat(this._getResult(res.data))
            this._checkMore(res.data)
            this.loading = false
          }
        })
      },
      getDisplayName(item){
        return `${item.name}-${item.singer}`
      },
      handleScroll(e){
        var suggestWrap = this.$refs.suggest;
        var clientHeight = suggestWrap.clientHeight //可视高度
        var scrollTop = suggestWrap.scrollTop //滚动动高度

        var suggestList = this.$refs.suggestList;
        var height = suggestList.offsetHeight; //获取list的总高度

        if (clientHeight + scrollTop + 2  > height) {
          this.searchMore()
        }
      },
      clickToPlay(item){
        this.insertSong(item)
      },
      _getResult(data){
        let ret = []
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret;
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      _checkMore(data){
        const song = data.song;
        if (!song.list.length || song.curpage * perpage > song.totalnum) {
          this.hasMore = false
        }
      },
      initMarginBottom(){
        var suggestList = this.$refs.suggestList;
        suggestList.style.paddingBottom = this.playlist.length > 0 ? '8.5rem' : '5rem'
      },
      ...mapActions([
          'insertSong'
      ])
    },
    watch: {
      query(){
        this.search()
        this.hasMore = true
        this.page = 1
      },
      fullScreen(){
        this.initMarginBottom()
      }
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>
  .suggest {
    overflow: scroll;
    height: 100%;
    .suggest-list {
      padding-bottom: 5.2rem;
      box-sizing: border-box;
      .suggest-item {
        padding: .2rem 0;
        list-style: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        height: 1.5rem;
        line-height: 1.5rem;
        .icon {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-image: url("../image/music.png");
          background-size: cover;
        }
        .name {
          display: inline-block;
        }
      }
    }
  }
</style>
