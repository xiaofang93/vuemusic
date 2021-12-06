/*
 * @Author: your name
 * @Date: 2021-11-13 22:25:30
 * @LastEditTime: 2021-11-14 21:23:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vueMusic\src\notework\requestList.js
 */
import { request } from "@/notework/request"

/**
 * 获取用户个人信息
 * @param {*} phone
 * @param {*} password
 * @param {Function} callback
 * @returns {*}
 */
export function loginForPhone(phone, password, callback) {
  return request({
    url: "/login/cellphone",
    params: {
      phone,
      password,
    },
  }).then(callback)
}
// 获取每日推荐歌单封面/需要登录的歌单
export function getRecommend(callbacks) {
  return request({
    url: "/personalized",
    params: {},
  }).then(callbacks)
}
// 获取每日推荐歌曲列表
export function getRecommendSong(callback) {
  return request({
    url: "/recommend/songs",
  }).then(callback)
}


export function getRecommendSongs(id, callback) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  }).then(callback)
}

// 根据id获取歌曲url
export function getSongURL(id, callback) {
  return request({
    url: "/song/url",
    params: {
      id,
    },
  }).then(callback)
}
