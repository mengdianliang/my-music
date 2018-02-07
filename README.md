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
* 图片懒加载
  ``` python
  npm i -D vue-lazyload
  import VueLazyload from 'vue-lazyload'
  github网址：https://github.com/hilongjw/vue-lazyload
  ```
* jsonp插件
  ``` bash
  npm i -S jsonp
  import originJSONP from 'jsonp'
  github网址：https://github.com/webmodules/jsonp
  ```
* 本地存储
  ``` bash
  npm install good-storage
  import storage from 'good-storage'
  github网址：https://github.com/ustbhuangyi/storage
  ```
* js-base64
  ``` bash
  npm install --save js-base64
  import { Base64 } from 'js-base64'
  github网址：https://github.com/dankogai/js-base64
  ```
### 难点

#### player组件
播放器组件可谓是整个项目的核心,属于公共组件，通过`vuex`中`actions`来提交`mutations`，来播放列表、播放模式、当前播放歌曲状态管理。组件结构：
全屏播放跟mini播放,有歌词展示，当前歌曲高亮展示，歌曲播放时间，进度条，上一首，下一首，暂停、开始等操作，这里需要用到html5播放器的知识。
> 
为了防止切换歌曲时点击速度过快导致歌曲播放错误，使用了`audio`的`onplay`API，结合`Vuex`获取到数据，判断当前歌曲数据请求到才可以切换下一首歌曲，判断函数如下
``` javascript
 ready() {
   this.songReady = true
 }
```
#### 交互体验
该项目的很多地方都涉及到滚动，包括下拉滚动，下拉滚动刷新等。这里面用到了一个库(`better-scroll`)，来实现所有涉及到的滚动，建议学习下它的[API](https://github.com/ustbhuangyi/better-scroll)。

其他动画包括了`Vue`的`transition`动画，路由之间切换时的简单动画，播放器打开时的动画，这个地方比较难，也比较好玩。

打开页面时的加载Loading效果，其实就是一个Loading组件，也比较简单。

为了减少流量，图片加载使用了懒加载的方式，滚动时再加载真实的图片。

### 效果
![](https://github.com/mengdianliang/my-music/blob/master/show/player1.png)
![](https://github.com/mengdianliang/my-music/blob/master/show/player2.png)
![](https://github.com/mengdianliang/my-music/blob/master/show/player3.png)
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
通过学习该项目，自己收获了许多，实践中也遇到了大大小小许多问题，通过断点调试，代码划分等最终解决了问题。发现vuex基础，js编码能力有待提升。


