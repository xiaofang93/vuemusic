<template>
  <div v-if="isShow" class="recommendSwiper">
    
      <!-- 歌单列表 -->
      <div
        class="musicListTitle musicItem"
        v-for="(item, index) in songDetail"
        :key="item.id"
        @dblclick="playMusic(index)"
        :class="{ currentMusic: item.id == StateSongCurrentId }"
      >
        <li>
          <span class="musicIndex">{{ index + 1 }}</span>
          <img :src="item.al.picUrl" alt="" />
          <span class="musicTitle">{{ item.name }}</span>
        </li>
        <li>{{ item.ar[0].name }}</li>
        <li>{{ item.al.name }}</li>
        <li>{{ setTime(item.dt) }}</li>
      </div>
    
  </div>
</template>

<script>
export default {
  name: "MiniPlayList",
  data() {
    return {
      // 音乐歌单详情数据
      songDetail: [],
      // 音乐ID数据
      songAlId: [],
    }
  },
  created() {
    this.getRecommendSongFun()
  },

  computed: {
    isShow() {
      let isShow = this.$store.state.miniPlayList
      return isShow
    },
    // 当前所播放的音乐ID
    StateSongCurrentId() {
      return this.$store.state.songCurrentId
    },
  },
  methods: {
    // 获取每日推荐歌曲
    getRecommendSongFun() {
      if (this.$store.state.songDetail.length != 0) {
        this.songDetail = this.$store.state.songDetail
      } else if(window.localStorage.songCurrentDetail.length!=0){
        this.songDetail=JSON.parse(window.localStorage.songCurrentDetail)
      }else{
        return ""
      } 
    },
    // 双击列表歌曲的回调
    playMusic(index) {
      this.$store.commit("songCurrent", index)
    },

    // 时间格式化
    setTime(dt) {
      let m = dt / 1000 / 60
      let mm = Math.floor(m)
      let s = (m - mm) * 60
      let ss = Math.floor(s)
      ss > 9 || (ss = "0" + ss)
      mm > 9 || (mm = "0" + mm)
      return mm + ":" + ss
    },
  },
}
</script>

<style scoped>
/* 头部文字 */
.recommendSwiper {
  position: absolute;
  border: 1px solid #ccc;
  bottom: 130px;
  border-radius: 10px;
  right: 22px;
  width: 30%;
  height: calc(100vh - 500px);
  overflow: hidden;
  overflow-y: scroll;
  background: rgba(158, 127, 180,.9);
}
/* 修改滚动条样式 */
.recommendSwiper::-webkit-scrollbar {
  display: none;
}

/* 歌单列表 */
.musicListTitle {
  display: flex;
  justify-content: space-around;
  list-style: none;

  height: 55px;
  line-height: 55px;
  margin-top: 5px;
  margin-left: 5px;
  padding: 3px;
  border-bottom: 1px solid rgb(180, 179, 179);
  font-size: 13px;
}
.musicListTitle li {
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicListTitle li:nth-child(1) {
  flex: 3;
  display: flex;
}
.musicListTitle li:nth-child(1) .musicIndex {
  width: 30px;
  text-align: center;
}
.musicListTitle li:nth-child(1) img {
  height: 100%;
  border-radius: 50%;
  margin-right: 10px;
}
.musicListTitle li:nth-child(1) .musicTitle {
  width: 80%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicListTitle li:nth-child(2) {
  flex: 1;
}
.musicListTitle li:nth-child(3) {
  flex: 1.5;
}
.musicListTitle li:nth-child(4) {
  flex: 0.7;
}

.musicItem:hover {
  color: rgb(174, 179, 170);
  background: rgba(103, 108, 109, 0.5);
}

.currentMusic {
  background-color: rgb(93, 92, 189);
}
</style>
