import axios from 'axios'

export function getLyric(mid) {
  const url = '/api/getLyric'

  const data = {
    callback: 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: mid,
    g_tk: 237595013,
    jsonpCallback: 'MusicJsonCallback_lrc',
    loginUin: 307728392,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch(function(err) {
    console.log(err)
  })
}
