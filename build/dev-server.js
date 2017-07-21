require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var https = require('https');
var http = require('http');



// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

/*模拟获取后台数据*/
var appData = require('../data.json');
var musicList = appData.recommend;

var apiRoutes = express.Router();

app.use('', apiRoutes);
apiRoutes.get('/static/musicList', function (req, res) {
  res.json({
    ret: 0,
    musicList: musicList
  })
})
/*模拟获取后台数据*/
var getUrl = (url, submitData) => {
  url = url + '?';
  for (var i in submitData) {
    if (submitData[i]) {
      url += i + '=' + submitData[i] + '&'
    }
  }
  return url.substring(0, url.length - 1);
}
/*使用node.js来获取豆瓣接口数据*/
apiRoutes.get('/db/search/:q/:tag/:start/:count', function (req, res) {
  let q = req.params.q,
    tag = req.params.tag,
    start = req.params.start,
    count = req.params.count;

  let url = "https://api.douban.com/v2/music/search",
    submitData = {
      "q": q,
      "tag": tag,
      "start": start,
      "count": count
    };

  let result = ''
  let getMusicList = new Promise((resolve, reject) => {
    https.get(getUrl(encodeURI(url), submitData), (response) => {
      response.on('data', data => {
        result += data;
      });
      response.on('end', () => {
        resolve(result);
      });
    })
  });

  getMusicList.then((result) => {
    var result1 = JSON.parse(result);
    res.json({
      res: 0,
      musicList: result1
    });
  })
})
/*使用node.js来获取豆瓣接口数据*/


/*使用百度api查询音乐*/
apiRoutes.get('/api/music', function (req, res) {
  let method = 'baidu.ting.billboard.billList',
    params = req.query;
  params.method = method;
  let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting';

  let result = '';
  //先获取列表音乐的songID
  let getMusicList = new Promise((resolve, reject) => {
    http.get(getUrl(url, params), (response) => {
      response.on('data', data => {
        result += data;
      });
      response.on('end', () => {
        resolve(result);
      });
    })
  })

  getMusicList.then( data => {
    let musicList = [],
      testlist = [];
    data = JSON.parse(data).song_list;
    let music = getMusic(data[0].song_id);
    res.json({
      alone: music
    })
    //  for(let i in data){
    //    testlist.push({name:'lin'});
    //   getMusic(data[0].song_id).then( music => {
    //     musicList.push(JSON.parse(music));
    //   })
    //   // musicList.push(getMusic(data[0].songid))
    //  };
    // res.json({
    //   musicList: musicList,
    //   testlist: testlist
    // });
  }).then( () => {

  });

  /*getMusic(544606704).then( music => {
      res.json({
        ret: JSON.parse(music)
      })
  })*/

  //再通过songId，来获取音乐信息；
  function getMusic(songid) {
    let url = 'http://tingapi.ting.baidu.com/v1/restserver/ting',
      params = {
        method: 'baidu.ting.song.playAAC',
        songid: songid
      };
    let result = '';
   let music =  new Promise((resolve, reject) => {
      http.get(getUrl(url,params), (response) => {
        response.on('data', data => {
          result += data;
        });
        response.on('end', () => {
          resolve(result);
        });
      })
    })
    music.then( (musicI) => (JSON.parse(musicI)) );
  }


})
/*使用百度api查询音乐*/

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  },
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
