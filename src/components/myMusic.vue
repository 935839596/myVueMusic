<template>
  <div class="musicList">
    <ul>
      <li class="musicItem" v-for="(music,index) in musicList">
        <img :src="music.picUrl" alt="">
        <span class="musicName">{{`${index + 1}.${music.artist.name + ' - ' + music.name}`}}</span>
        <a class="del" @click="deleteMusic(index)" href="javascript:;">删除</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        musicList: []
      }
    },
    mounted () {
      axios.get('/api/musicList').then((response) => {
        this.musicList = response.data.musicList;
      }).catch(error => {
        console.log(error);
      });

     /* axios.get('http://lolapi.games-cube.com/Free',{
        headers:{
          token:'DAIWAN-API-TOKEN'
        }
      }).then((res) => {
        console.log(res.data);
      })*/
    },
    methods: {
      deleteMusic(index){
        this.musicList.splice(index - 1, 1)
      }
    }
  }
</script>

<style lang="less">
  .musicList {
    padding: .8rem;
    margin-top: 10rem;
    font-size: 2rem;
    flex: 8;
    .musicItem {
      position: flex;
      position: relative;
      border-bottom: 1px solid grey;
      line-height: 10rem;
      & > img {
        width: 8rem;
        height: 8rem;
        margin-left: 2rem;
        margin-right: 2rem;
        vertical-align: middle;
      }
      .musicName {
        font-size: 2rem;
        color: grey;
      }
      .del {
        position: absolute;
        right: 2rem;
        font-size: 2rem;
        text-decoration: none;
        color: red;
      }

    }
  }
</style>
