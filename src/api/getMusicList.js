/**
 * Created by linGo on 2017/8/7.
 */
import jsonp from '../common/js/jsonp'


export function getMusicList() {
  return getRandomId().then( (id) => {
    return id
  }).then( (topid) => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
    const data = {
      tpl: 3,
      page: 'detail',
      topid,
      type: 'top',
      song_begin: 0,
      song_num: 15,
      g_tk: 5381,
      loginUin:0,
      hostUin:0,
      format:'jsonp',
      inCharset:'utf8',
      outCharset:'utf-8',
      notice:0,
      platform:'yqq',
      needNewCode:0
    }

    const options ={
      param: 'jsonpCallback'
    }
    return jsonp(url,data,options)

  })


}

 function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  }
   const options ={
     param: 'jsonpCallback'
   }
  return jsonp(url, data, options)
}

//获得随机巅峰榜id
function getRandomId(){
  let topIdList = []
  return getTopList().then( (res) => {
    let toplist = res.data.topList.slice();
    toplist.forEach( (item) => {
      topIdList.push(item.id)
    })
    return topIdList
  }).then( (list) => {
    let len = list.length;
    return (list[Math.floor(Math.random() * (len - 1 ))]) ;
  })

}
