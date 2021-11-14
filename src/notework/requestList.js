/*
 * @Author: your name
 * @Date: 2021-11-13 22:25:30
 * @LastEditTime: 2021-11-14 00:58:56
 * @LastEditors: your name
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
