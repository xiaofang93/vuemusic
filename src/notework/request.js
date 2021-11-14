import axios from "axios"

export function request(config) {
  const instance = axios.create({
    baseURL: "http://8.210.163.243:3000",
  })
  return instance(config)
}
