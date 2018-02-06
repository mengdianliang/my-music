import jsonp from '../common/js/jsonp'

export function getSingerList() {
  const url = 'https://szc.y.qq.com/v8/fcg-bin/v8.fcg'
  const options = {
    param: 'jsonpCallback',
    name: 'GetSingerListCallback'
  }
  const data = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 307728392,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  }

  return jsonp(url, data, options)
}
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const options = {
    param: 'jsonpCallback',
    name: 'MusicJsonCallbacksinger_track'
  }
  const data = {
    g_tk: 5381,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'jsonp',
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  }

  return jsonp(url, data, options)
}
