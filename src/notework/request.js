import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "/api",
    // 在发起跨域请求时，后端已经开启CORS，前端需要也携带cookie，
    // 此时需要在前端请求头加上 withCredentials: true，表示请
    // 求可以携带cookie，
    withCredentials: true,
  })
  return instance(config)
}
