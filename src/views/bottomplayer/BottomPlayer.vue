<template>
  <div class="bottomPlay">
    <div class="songdetail" v-if="currentSong.length !== 0">
      <p class="currentIndex">{{ songCurrentIndex }}</p>

      <img class="songimage" :src="currentSong.al.picUrl" alt="" />
      <div class="songtext">
        <p>{{ currentSong.name }}</p>
        <p>{{ currentSong.ar[0].name }}</p>
      </div>
    </div>
    <div class="playerControl">
      <div class="playerImg">
        <!-- 播放顺序 -->
        <span :class="getPlayerMode" @click="PlayerModel"></span>
        <!-- 上一首 -->
        <span class="iconfont icon-diyiyeshouyeshangyishou" @click="switchSong('last')"></span>

        <!-- 播放按钮 -->
        <span
          :class="[PlayerState ? 'iconfont icon-zanting' : 'iconfont icon-bofang1']"
          @click="controlPlayer"
        ></span>
        <!-- 下一首 -->
        <span class="iconfont icon-zuihouyiyemoyexiayishou" @click="switchSong('isNext')"></span>

        <!-- 播放音量 -->
        <span class="iconfont audioVolume">
          <!-- 音量外 点击按钮 -->
          <span
            :class="[isAudioMute ? 'iconfont icon-yinliangdi' : 'iconfont icon-quxiaoyinliang']"
            @click="audioVolume"
          >
          </span>
          <!-- 音量点击隐藏区域 -->
          <div v-show="volumeShow" class="volumeShowSwiper">
            <div class="volumeProgress">
              <input
                class="audioVolumeInput"
                type="range"
                name="123"
                min="0"
                max="1"
                step="0.02"
                v-model="volumeInput"
                @input="changeVolume"
              />
            </div>
            <div class="volumeTitle">{{ volumeInputTitle }}</div>
            <div
              :class="[
                isAudioMute
                  ? 'iconfont icon-yinliangdi audioVolumeMini'
                  : 'iconfont icon-quxiaoyinliang audioVolumeMini',
              ]"
              @click="isMuteBtn"
            ></div>
          </div>
        </span>
      </div>
      <div class="progress">
        <span>{{ getCurrentTime }}</span>
        <input
          class="allTime"
          v-model="currentTimeProgress"
          type="range"
          name="234"
          min="0"
          max="1"
          step="0.005"
          @input="songTimeProgress"
        />
        <span>{{ getSongAllTime }}</span>
      </div>
    </div>

    <div class="rightPlayerControl">
      <span class="showPlayList iconfont icon-24gf-playlistMusic5" @click="showPlayList"></span>

      <span class="iconfont icon-diyiyeshouyeshangyishou"></span>

      <span class="iconfont icon-zanting"></span>

      <span class="iconfont icon-zuihouyiyemoyexiayishou"></span>
    </div>
    <mini-play-list />
  </div>
</template>

<script>
import { getSongURL } from "@/network/requestList"
import MiniPlayList from "./MiniPlayList.vue"
export default {
  name: "BottomPlayer",
  components: {
    MiniPlayList,
  },
  data() {
    return {
      media: null,
      // 播放状态,是否在播放
      PlayerState: false,
      // 音量隐藏菜单显示状态
      volumeShow: false,
      // 音量是否为静音状态
      isAudioMute: true,
      // 实时音量的大小 0-1
      volumeInput: "",
      //记录静音前的音量
      isVolumeInput: "",

      // 歌曲当前已播放时长 单位 s
      currentTime: "",

      // 歌曲当前已播放时长进度0-1
      currentTimeProgress: "0",
      // 播放顺序的图标
      classIconfont: "",
      // 歌曲播放顺序模式 1 2 3
      playerMode: 1,
    }
  },

  computed: {
    currentSong() {
      return this.$store.state.currentSong
    },
    songCurrentId() {
      return this.$store.state.songCurrentId
    },
    songCurrentIndex() {
      let index = ""
      let stateIndex = this.$store.state.songCurrentIndex
      stateIndex ? (index = stateIndex) : (index = "")
      return index
    },

    // 音量调节文字提示
    volumeInputTitle() {
      return Math.floor(this.volumeInput * 100) + "%"
    },
    // 当前播放音乐的总时长
    getSongAllTime() {
      if (this.$store.state.songAllTime) {
        let time = this.$store.state.songAllTime
        let s = Math.floor(time / 1000)
        return this.upDataSongTime(s)
      } else {
        return "00:00"
      }
    },
    // 当前已播放音乐的时长
    getCurrentTime() {
      if (this.currentTime) {
        let cTime = this.currentTime
        let s = Math.floor(cTime)
        return this.upDataSongTime(s)
      } else {
        return "00:00"
      }
    },
    //当前播放的音乐循环模式
    getPlayerMode() {
      if (this.playerMode == 1) {
        return "iconfont icon-suijibofang1"
      } else if (this.playerMode == 2) {
        return "iconfont icon-danquxunhuan"
      } else {
        return "iconfont icon-suijibofang"
      }
    },
  },

  // watch 侦听器
  // 需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
  watch: {
    // 如果 songId() 发生改变，这个函数就会运行
    // 侦听当前播放的Id变化
    songCurrentId(val, oldVal) {
      if (val != oldVal) {
        console.log(val)
        this.getAudio(this.songCurrentId)
      }
    },
  },
  created() {
    // 创建音频 Audio()
    this.initMedia()
    // 初始化数据
    // 首次进去时,如果没有数据,就使用本地历史数据
    this.getSongDetailList()
  },

  methods: {
    initMedia() {
      // 创建音频对象实例
      this.media = new Audio()
      // 监听当前音频已播放的时长
      this.media.addEventListener("timeupdate", (e) => {
        this.upDataAllTimeList()
      })
      // 监听当前歌曲播放完后
      this.media.addEventListener("ended", (e) => {
        this.switchSong("next")
      })
    },
    // 监听播放时间动态数据的回调
    upDataAllTimeList() {
      let currentTime = this.media.currentTime
      let allTime = this.$store.state.songAllTime / 1000
      this.currentTime = currentTime
      this.currentTimeProgress = this.currentTime / allTime
      console.log(currentTime)

      // 将当前已播放时间存入本地
      window.localStorage.currentTime = this.currentTime
    },
    // 初始化数据 (首次进入)
    getSongDetailList() {
      // 首次进去时,如果没有数据,就提交vueX使用本地历史数据.
      this.$store.state.songCurrentDetail.length !== 0 || this.$store.commit("updateSongDetail")
      // 初始化播放器历史音量
      if (this.volumeInput.length == 0 && window.localStorage.volumeInput) {
        this.volumeInput = window.localStorage.volumeInput / 1
      } else {
        this.volumeInput = 1
      }

      this.changeVolume()

      // 初始化历史已播放时长
      if (window.localStorage.currentTime) {
        this.media.currentTime || (this.media.currentTime = window.localStorage.currentTime)
        // 将历史已播放时长挂载进动态展示样式中
        this.upDataAllTimeList()
      }
      // 初始化历史循环模式
      if (window.localStorage.playerMode) {
        this.playerMode = window.localStorage.playerMode / 1
      }
    },

    getAudio(id) {
      // 请求音乐url
      getSongURL(id, (res) => {
        console.log(res)
        const url = res.data.data[0].url
        console.log(url)

        // 调用音频对象,并传入url
        this.media.src = url
        console.log(url)
      })
    },
    // 格式化播放的时间的回调
    upDataSongTime(s) {
      let m = Math.floor(s / 60)
      let ss = Math.floor(s - m * 60)
      ss > 9 || (ss = "0" + ss)
      m > 9 || (m = "0" + m)
      return m + ":" + ss
    },
    // 循环模式 切换的按钮
    PlayerModel() {
      this.playerMode += 1
      this.playerMode == 4 && (this.playerMode = 1)
      console.log(this.playerMode)
      if (this.playerMode != 2) {
        this.media.loop = false
      }
      // 将循环模式保存至本地
      window.localStorage.playerMode = this.playerMode
    },
    // 播放按钮
    controlPlayer() {
      if (this.media.paused) {
        this.media.play()
        this.PlayerState = true
      } else {
        this.media.pause()
        this.PlayerState = false
      }
      console.log(this.PlayerState)

      this.listenerPlayer()
    },
    // 监听音频是否已经加载
    listenerPlayer() {
      let on_off = true
      if (on_off) {
        this.media.addEventListener("suspend", (e) => {
          console.log(178)
          this.media.play()
          this.PlayerState = true
          on_off = false
          console.log("监听加载")
        })
      }
    },
    // 上/下一首 按钮 并判断循环模式
    switchSong(type) {
      let Index = this.$store.state.songCurrentIndex / 1
      let Detail = this.$store.state.songCurrentDetail

      // 只要不是模式2  就把播放器单曲循环关闭
      // if (this.playerMode != 2) {
      //   this.media.loop = false
      // }

      if (type == "last") {
        console.log(type)
        //上一首
        // 如果歌曲的index==0,就让index回到最后最后一首歌曲
        Index === 0 && (Index = Detail.length)

        Index -= 1
      } else if (type == "next" || type == "isNext") {
        // next表示是播放器自动的下一首歌曲标识,isNext是用户点击的下一首歌曲标识
        // playerMode:3 表示随机播放  2 循环播放  1 顺序播放
        if (this.playerMode == 3) {
          let num = Math.floor(Math.random() * Detail.length)
          console.log(num)
          Index = num
        } else if (this.playerMode == 2 && type != "isNext") {
          this.media.loop = true
          this.media.play()
        } else {
          //下一首
          // 如果歌曲是最后一首,就让index回到第一首歌曲
          Index === Detail.length - 1 && (Index = -1)
          Index += 1
        }
      }

      this.$store.commit("songCurrent", Index)
      console.log(type)
      // 播放器为暂停状态,就开始播放
      this.media.paused === true || this.media.play()
    },
    // 音量调节菜单开关
    audioVolume() {
      console.log(this.media.volume)
      this.volumeShow = !this.volumeShow
    },
    // 是否静音按钮
    isMuteBtn() {
      if (this.volumeInput === 0) {
        if (this.isVolumeInput == 0) {
          this.isVolumeInput = 0.5
        }
        this.volumeInput = this.isVolumeInput
        this.isAudioMute = true
      } else {
        this.volumeInput = 0
        this.isAudioMute = false
      }
      this.media.volume = this.volumeInput
    },
    //  input事件,音量调节按钮
    // 音量隐藏菜单显示状态 volumeShow: false,
    //  音量是否为静音状态 isAudioMute: true,
    //  实时音量的大小   volumeInput: "",
    // 记录静音前的音量  isVolumeInput: "",
    changeVolume() {
      console.log(this.volumeInput)
      this.media.volume = this.volumeInput
      this.isVolumeInput = this.volumeInput
      this.isAudioMute = this.isVolumeInput != 0

      // 防抖处理并保存当前音量至本地
      clearTimeout(this.volumeInfo)
      this.volumeInfo = setTimeout(() => {
        window.localStorage.volumeInput = this.volumeInput
        console.log(1)
      }, 300)
    },
    // 音乐进度条input事件
    songTimeProgress(e) {
      console.log(e)
      let value = e.target.value
      let allTime = this.$store.state.songAllTime / 1000
      this.media.currentTime = value * allTime
    },

    showPlayList() {
      this.$store.commit("changeMiniPlayList")
    },
  },
}
</script>

<style scoped>
.bottomPlay {
  width: 100%;
  height: 100px;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/* 歌曲详情 */
.songdetail {
  display: flex;
  align-items: center;
  width: 200px;
}
.currentIndex {
  color: rgb(179, 173, 173);
  font-size: 18px;
  margin-right: 10px;
}
.songtext {
  margin-left: 10px;
  color: #ccc;
  display: flex;
  flex-direction: column;
}
.songtext p {
  display: inline-block;
  margin: 0;
  height: 20px;
  width: 140px;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}
.songtext p:nth-child(1) {
  margin-bottom: 6px;
}

.songimage {
  width: 70px;
  height: 70px;
  border-radius: 8px;
}

/* 播放器控制面板 */

.playerControl {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 50vw;
  /* width: 40%; */
}
.playerImg .iconfont {
  font-size: 35px;
  text-align: center;
  margin: 0 18px;
  width: 30px;
  height: 30px;
  font-size: 30px;
  color: rgb(183, 206, 235);
}
.playerImg .iconfont:hover {
  color: rgb(221, 98, 98);
}

/* 音量调节区域 */
.playerImg .audioVolume {
  position: relative;
}
.audioVolume .volumeShowSwiper {
  height: 180px;
  width: 50px;
  background-color: rgb(204, 150, 240);
  border-radius: 10px;
  position: absolute;
  left: 50%;
  top: -180px;
  transform: translate(-50%, 0);
}
.volumeProgress {
  height: 120px;
  width: 4px;

  margin: 5px auto 2px;
  position: relative;
}

.audioVolumeInput {
  position: absolute;
  bottom: -15px;
  left: 5px;
  width: 120px;
  height: 4px;
  transform-origin: -7px 0;
  transform: rotate(-90deg);
  color: brown;
}

.volumeTitle {
  font-size: 15px;
  color: bisque;
  text-align: center;
  border-bottom: 1px solid rgb(218, 213, 213);
}
.volumeShowSwiper .audioVolumeMini {
  margin: 0 auto;
  color: rgb(224, 213, 228);
}

/* 歌曲播放进度条区域 */
.progress {
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 5px;
}
.allTime {
  width: 100%;
  margin: 3px;
  flex: 1;
  height: 1px;
  border: 2px solid #ccc;
}
.allTime::-webkit-input-placeholder {
  color: rgb(207, 207, 76);
}

/* 右边控制台 */
.rightPlayerControl .iconfont {
  font-size: 25px;
}
.showPlayList {
  color: rgb(225, 216, 228);
}
.showPlayList:hover {
  color: rgb(216, 80, 38);
}
</style>
