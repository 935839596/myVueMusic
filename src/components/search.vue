<template>
  <div class="search">
    <div class="searchWrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" >
      <div class="shortcut">
        <div class="hot-key">
          <span class="title">热门搜索</span>
          <ul>
            <li class="item" v-for="item in hotkey" @click="addQuery(item.k)">
              <span>{{item.k}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>

</template>

<script>
  import searchBox from '@/base/searchBox'
  import {getHotKey} from '@/api/search'
  import suggest from '@/components/suggest'

  export default {
    components: {
      searchBox,
      suggest
    },
    data(){
      return {
        hotkey: [],
        query: ''
      }
    },
    methods: {
      onQueryChange(query){
         this.query = query
      },
      _getHotKey(){
        getHotKey().then( (res) => {
          if(res.code === 0){
            this.hotkey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      addQuery(query){
        this.$refs.searchBox.setQuery(query)
      }
    },
    created() {
      this._getHotKey();
    }
  }
</script>

<style lang="less" scoped>
  .search{
    flex:1;
    display: flex;
    flex-direction: column;
    .shortcut-wrapper{
      margin: 1.2rem;
      ul{
        margin-top: .5rem;
        li{
          list-style: none;
          display: inline-block;
          margin: .5rem;
          border: 1px solid rgba(0,0,0,0.6);
          padding: .1rem;
          border-radius: 5px;
          text-align: center;
          min-width: 2rem;
        }
      }
    }
    .search-result{
      margin: 0 1.2rem;
      overflow: auto;
    }
  }
</style>
