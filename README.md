# my-music

--------
### 概述
项目是基于Vue.js，成品是一个移动端的音乐播放器。
#### 模块划分
> 
* [x] 推荐
* [ ] 推荐详情
* [x] 歌手
* [x] 歌手详情
* [x] 排行榜
* [x] 排行榜详情
* [x] 搜索
* [x] 用户中心
* [x] 歌曲播放
#### 技术栈
> 
*  Vue
*  Vuex
*  Vue-Router
*  Vue-cli
*  Stylus
*  Axios

#### src目录结构
* api：用来请求服务器端数据的，通过`jsonp`和`axios`发送请求，服务端代理，需要在`config/index.js`中设置代理接口
    proxyTable: {
      '/api': {
        target: 'http://localhost:9000'
      }
    }
* base: 存放一些基础的组件 
* common: 存放字体、图片、样式、工具类文件
* components: 存放一些视图组件
* router: 配置路由
* store: 一些共享状态管理
#### 好用的插件
* 图片懒加载：
  npm i -D vue-lazyload
  import VueLazyload from 'vue-lazyload'
  github网址：https://github.com/hilongjw/vue-lazyload
  使用：
  main.js中
  Vue.use(VueLazyload, {
    loading: require('./common/image/default.png')
  })

  图片元素上：
  <img width="60" height="60" v-lazy="item.imgurl"/>
* jsonp插件
  npm i -S jsonp
  import originJSONP from 'jsonp'
  github网址：https://github.com/webmodules/jsonp
  封装：
  export default function jsonp(url, data, option) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
      originJSONP(url, option, (err, data) => {
        if (!err) {
          resolve(data)
        } else {
          reject(err)
        }
      })
    })
  }

  function param(data) {
    let url = ''
    for (let k in data) {
      let value = data[k] !== undefined ? data[k] : ''
      url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
  }
  使用：
  import jsonp from 'common/js/jsonp'

  export function getRecommend() {
    const url = 'https://shc.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const options = {
      param: 'jsonpCallback'
    }
    const data = {
      g_tk: 5381,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp',
      platform: 'h5',
      uin: 0,
      needNewCode: 1,
      _: 1515922621811
    }
    return jsonp(url, data, options)
  }
* 本地存储
  npm install good-storage
  import storage from 'good-storage'
  github网址：https://github.com/ustbhuangyi/storage
  使用:
  set(key, val)
  set storage with key and val

  get(key, def)
  get storage with key, return def if not find

  remove(key)
  remove storage with key

  has(key)
  determine storage has the key

  clear()
  clear all storages

  getAll()
  get all the storages

  forEach(callback)
  forEach the storages and call the callback 
* js-base64
  npm install --save js-base64
  import { Base64 } from 'js-base64';
  github网址：https://github.com/dankogai/js-base64
  使用:
  Base64.encode('dankogai');  // ZGFua29nYWk=
  Base64.encode('小飼弾');    // 5bCP6aO85by+
  Base64.encodeURI('小飼弾'); // 5bCP6aO85by-

  Base64.decode('ZGFua29nYWk=');  // dankogai
  Base64.decode('5bCP6aO85by+');  // 小飼弾
  // note .decodeURI() is unnecessary since it accepts both flavors
  Base64.decode('5bCP6aO85by-');  // 小飼弾
  ### 难点

#### player组件
讲一讲`player`	播放器组件，播放器组件可谓是整个项目的核心，当然数据处理和用户体验方面也是不简单的（逃。
播放器是全局组件，放在`App.vue`下面，通过`Vuex`传递数据，触发`action`提交`mutation`，从而使播放器开始工作。当然，其中的数据交互说复杂也不是很复杂，就是要花多点时间理解，`player`组件由多个基础组件构成，具体请看项目代码，下面上图
![](https://oc1gyfe6q.qnssl.com/17-7-28/75828095.jpg)

> 
为了防止切换歌曲时点击速度过快导致歌曲播放错误，使用了`audio`的`onplay`API，结合`Vuex`获取到数据，判断当前歌曲数据请求到才可以切换下一首歌曲，判断函数如下
``` javascript
 ready() {
   this.songReady = true
 }
```
#### 数据处理
通过调用QQ音乐的JSONP接口，获取的数据并不能直接拿来用，需要做进一步的规格化，达到我们使用的要求，所以在这方面单独封装了一个`class`来处理这方面的数据，具体请看`src/common/js/song.js`

在请求JSONP的时候，用到了一个JSONP库，这个库代码十分简短，只有几十行，有兴趣的同学可以[学习](https://github.com/webmodules/jsonp)下。

使用时，就是将请求的参数拼接在请求url上，然后调用这个库的`jsonp`方法。所以，在此封装了两个函数，一个是将参数拼接在url上，另一个是将库里面的`jsonp`方法Promise化，方便我们使用，具体请查看`src/common/js/jsonp.js`。

将请求的数据格式化后再通过`Vuex`传递，组件间共享，实现歌曲的播放切换等。

#### 交互体验
该项目的很多地方都涉及到滚动，包括下拉滚动，下拉滚动刷新等。这里面用到了一个库(`better-scroll`)，来实现所有涉及到的滚动，建议学习下它的[API](https://github.com/ustbhuangyi/better-scroll)。

其他动画包括了`Vue`的`transition`动画，路由之间切换时的简单动画，播放器打开时的动画，这个地方比较难，也比较好玩。

打开页面时的加载Loading效果，其实就是一个Loading组件，也比较简单。

为了减少流量，图片加载使用了懒加载的方式，滚动时再加载真实的图片。
具体效果请自身体验：）

### 效果
![](https://oc1gyfe6q.qnssl.com/17-7-28/29546400.jpg)
![](https://oc1gyfe6q.qnssl.com/17-7-28/80941247.jpg)
### 构建
#### 开发环境

``` bash
# install dependencies
npm install
# start server
node server/app.js
# serve with hot reload at localhost:8080
npm run dev
```
### 总结
通过学习该项目，自己收获了许多，实践中也遇到了大大小小许多问题，通过断点调试等最终解决了，对我来说无疑是最大的鼓励，也希望能与大家一起学习。
完:)

