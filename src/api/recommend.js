import jsonp from 'common/js/jsonp'
import axios from 'axios'

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

export function getDiscList() {
  const url = '/api/getDiscList'

  const data = {
    picmid: 1,
    rnd: 0.6100501912411382,
    g_tk: 5381,
    jsonpCallback: 'getPlaylist',
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(function(err) {
    console.log(err)
  })
}

export function getSongList(disstid) {
  const url = '/api/getSongList'

  const data = {
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    disstid,
    format: 'json',
    g_tk: 237595013,
    jsonpCallback: 'playlistinfoCallback',
    loginUin: 307728392,
    hostUin: 0,
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res)
    return Promise.resolve(res.data)
  }).catch(function(err) {
    console.log(err)
  })
}
