<template>
  <div class="searchBox">
    <div class="icon-search"></div>
    <input v-model="query" type="text" placeholder="查找歌曲">
    <div v-show="query" class="clear" @click="clear"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        query: ''
      }
    },
    methods: {
      clear(){
        this.query = ''
      },
      setQuery(query){
        this.query = query
      }
    },
    created() {
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    }
  }
</script>

<style lang="less" scoped="">
  @width: 2rem;

  .searchBox{
    margin: 1.2rem;
    height: 2rem;
    position: relative;
    display: flex;
    border: 1px solid #b6aca1;
    border-radius: 2px;
    align-items: center;
    /*background-color: #b6aca1;*/
    .icon-search{
      width: @width;
      height: @width;
      flex: 0 0 @width;
      background-image: url("../image/search.png");
      background-size: cover;
      display: inline-block;
    }
    input{
      flex:1;
      height: 100%;
      border: none;
      outline: none;
      /*background-color: #b6aca1;*/
    }
    .clear{
      flex: 0 0 @width/2;
      width: @width/2;
      height: @width/2;
      background-image: url("../image/cancel.png");
      background-size: cover;
      display: inline-block;
    }
  }
</style>
