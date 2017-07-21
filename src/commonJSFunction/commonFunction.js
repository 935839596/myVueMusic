/**
 * Created by linGo on 2017/7/20.
 */

export default {
  getReqUrl (url,submitData) {
    for(let i in submitData){
      url += '/'+submitData[i]
    }
    return url;
  }
}

