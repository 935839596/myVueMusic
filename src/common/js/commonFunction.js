/**
 * Created by linGo on 2017/7/20.
 */

export default {
  getReqUrl (url,submitData) {
    url = url + '?';
    for (var i in submitData) {
      if (submitData[i]) {
        url += i + '=' + submitData[i] + '&'
      }
    }
    return url.substring(0, url.length - 1);
  }
}

