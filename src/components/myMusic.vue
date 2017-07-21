<template>
  <div class="musicList">
    <ul>
      <li class="musicItem" v-for="(music,index) in musicList" @click="playMusic(index)">
        <img :src="music.picUrl" alt="">
        <span class="musicName" >{{`${index + 1}.${music.artist.name + ' - ' + music.name}`}}</span>
        <a class="del" @click.stop="deleteMusic(index)" href="javascript:;">删除</a>
      </li>
    </ul>
  </div>
</template>

<script>
  import commonJsFn from '../commonJSFunction/commonFunction'
  export default {
    data () {
      return {
        musicList: [],
        musicState: false
      }
    },
    mounted () {
      this.axios.get('/static/musicList').then((response) => {
        this.musicList = response.data.musicList;
      }).catch(error => {
        console.log(error);
      });

      var url = '/db/search',
          params = {
            q: "周杰伦",
            count: 10,
            tag: "林",
            start: 0
          }

      this.axios.get(commonJsFn.getReqUrl(url,params)).then((response) => {
        console.log(response.data);
      })

      url = 'api/music?type=2&size=10';
      params = {
        type: 2,
        size: 10,
        offset: 0
      };
      this.axios.get(url).then( response => {
        console.log(response.data);
      })
    },
    methods: {
      deleteMusic(index){
        this.musicList.splice(index - 1, 1)
      },
      playMusic(index){
        var music = this.musicList[index];
        this.$store.commit({
          type:'musicPlay',
          music: music
        })
      }
    }
  }
</script>

<style lang="less">
  .musicList {
    flex: 8;
    padding: .8rem;
    font-size: 2rem;
    overflow: auto;
    .musicItem {
      position: relative;
      border-bottom: 1px solid grey;
      line-height: 10rem;
      & > img {
        max-width: 8rem;
        max-height: 8rem;
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
