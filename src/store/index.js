import Vue from "vue"
import Vuex from "vuex"
import { getRecommendSong, getRecommendSongs, getRecommendList } from "../network/requestList.js"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 显示的歌曲列表
    songDetail: [],
    // 显示的歌曲列表(除了每日推荐歌曲,其他歌单都有头部介
    // 绍,相比songDetail,此对象只为了展现网络请求到的歌单介绍信息)
    songAllDetail: [],
    // 当前播放的歌曲列表
    songCurrentDetail: [],
    // 当前播放的id
    songCurrentId: "",
    // 当前播放的音乐详情
    currentSong: "",
    // 当前播放的音乐下标
    songCurrentIndex: [],
    // 当前的音频总时长 /毫秒
    songAllTime: [],

    // 歌单迷你列表显示开关
    miniPlayList: false,
  },
  mutations: {
    // 初次开启时,将本地信息放入state
    updateSongDetail(state) {
      console.log("1")
      // 如果本地有Detail,说明本地有历史播放列表信息,则将本地转存入vuex
      if (window.localStorage.songCurrentDetail) {
        state.songCurrentDetail = JSON.parse(window.localStorage.songCurrentDetail)
        state.songCurrentId = window.localStorage.songCurrentId
        state.currentSong = JSON.parse(window.localStorage.currentSong)
        state.songCurrentIndex = window.localStorage.songCurrentIndex
        state.songAllTime = state.songCurrentDetail[state.songCurrentIndex].dt
      }
    },

    // 获取当前显示的歌单列表
    songDetail(state, songDetail) {
      state.songDetail = songDetail
      console.log(state.songDetail)
      // 每日推荐歌曲没有头部介绍,所以每次进入新歌单,首先清除一次
      state.songAllDetail=[]
    },
    songAllDetail(state, songAllDetail) {
      state.songAllDetail = songAllDetail
      console.log(state.songAllDetail);
    },

    songCurrent(state, index) {
      console.log(index)
      // 点击播放音乐,更新后台播放的歌曲列表
      if (state.songDetail.length != 0) {
        state.songCurrentDetail = state.songDetail
      }
      // 获取当前所播放的音乐Id
      state.songCurrentId = state.songCurrentDetail[index].id
      // 获取当前所播放的音乐详情
      state.currentSong = state.songCurrentDetail[index]
      // 获取当前所播放的音乐的下标
      state.songCurrentIndex = index
      console.log(state.songCurrentId)
      // 获取当前播放的音频的总时长
      this.state.songAllTime = state.songCurrentDetail[state.songCurrentIndex].dt

      // 将当前播放的音乐列表 id 音乐详情 当前音乐下标 存入本地
      window.localStorage.songCurrentDetail = JSON.stringify(state.songCurrentDetail)
      window.localStorage.songCurrentId = state.songCurrentId
      window.localStorage.currentSong = JSON.stringify(state.currentSong)
      window.localStorage.songCurrentIndex = index
    },

    changeMiniPlayList(state) {
      state.miniPlayList = !state.miniPlayList
    },
  },
  actions: {
    // 点击每日歌曲推荐 跳转时候的推荐歌曲列表请求
    recommendInfo(context) {
      getRecommendSong((res) => {
        console.log(res)
        let songDetail = res.data.data.dailySongs
        console.log(songDetail)
        context.commit("songDetail", songDetail)
      })
    },
    // 点击歌单推荐
    recommendInfos(context, id) {
      console.log(id)
      getRecommendSongs(id, (res) => {
        console.log(res)
        let songAllDetail = res.data.playlist
        let songDetail = res.data.playlist.tracks
        
        console.log(songAllDetail);
        console.log(songDetail)
        context.commit("songDetail", songDetail)
        context.commit("songAllDetail", songAllDetail)
      })
    },
  },
  modules: {},
})
