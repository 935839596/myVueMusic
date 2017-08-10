<template>
  <div class="suggest">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result">
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
  import {filterSinger} from '@/api/song'

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
        result: []
      }
    },
    methods: {
      search(){
        search(this.query, this.page,false,20).then((res) => {
          if (res.code === 0) {
            this.result = this._getResult(res.data)
          }
        })
      },
      getDisplayName(item){
        return `${item.songname}-${filterSinger(item.singer)}`
      },
      _getResult(data){
        let ret = []
        if (data.song) {
          ret = ret.concat(data.song.list)
        }
        return ret;
      }
    },
    watch: {
      query(){
        this.search()
      }
    }
  }
</script>

<style lang="less" scoped>
  .suggest{
    .suggest-list{
      .suggest-item{
        padding: .2rem 0;
        list-style: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px solid rgba(0,0,0, 0.1);
        height: 1.5rem;
        line-height: 1.5rem;
        .icon{
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-image: url("../image/music.png");
          background-size: cover;
        }
        .name{
          display: inline-block;
        }
      }
    }
  }
</style>
