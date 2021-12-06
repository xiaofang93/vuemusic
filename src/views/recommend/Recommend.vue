<template>
  <div class="recommendSwiper">
    <!-- 歌单头部标题区域 -->
    <div class="Header">
      <div class="title">
        <img v-if="!stateSongAllDetail.coverImgUrl" class="headerImg" src="../../assets/img/05.png" alt="" />
        <img v-else class="headerImg" :src="stateSongAllDetail.coverImgUrl" alt="">
        <div class="headerText">
          <p v-if="!stateSongAllDetail.name">每日歌曲推荐</p>
          <p v-else>{{ stateSongAllDetail.name }}</p>
          <p v-if="!stateSongAllDetail.description">根据你的口味生成,每天6:00更新</p>
          <p v-else>{{ stateSongAllDetail.description }}</p>
        </div>
      </div>
      <div class="headerBtn">
        <span>播放全部</span>
        <span>收藏全部</span>
      </div>
    </div>
    <!-- 歌单列表区域 -->
    <div class="recommendList">
      <!-- 歌单表头 -->
      <div class="musicListTitle">
        <li>
          <span style="width: 22%"></span>
          <span>音乐标题</span>
        </li>
        <li>歌手</li>
        <li>专辑</li>
        <li>时长</li>
      </div>
      <!-- 歌单列表 -->
      <div
        class="musicListTitle musicItem"
        v-for="(item, index) in songDetail"
        :key="item.id"
        @dblclick="playMusic(index)"
        :class="{ currentMusic: item.id == stateSongCurrentId }"
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
  </div>
</template>

<script>
export default {
  name: "Recommend",
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
    // 当前所播放的音乐ID
    stateSongCurrentId() {
      return this.$store.state.songCurrentId
    },
    stateSongAllDetail() {
      let songAllDetail = this.$store.state.songAllDetail
      console.log(songAllDetail)
      return songAllDetail
    },
  },
  methods: {
    // 获取每日推荐歌曲
    getRecommendSongFun() {
      if (this.$store.state.songDetail.length != 0) {
        this.songDetail = this.$store.state.songDetail
      } else if (window.localStorage.songCurrentDetail.length != 0) {
        this.songDetail = JSON.parse(window.localStorage.songCurrentDetail)
      } else {
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
  width: 100%;
  height: calc(100vh - 204px);
  /* border: 1px solid #ccc; */
  overflow: hidden;
  overflow-y: scroll;
}
.recommendSwiper::-webkit-scrollbar {
  display: none;
}
.Header {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgb(170, 166, 166);
}
.title {
  display: flex;
  align-items: center;
  margin: 20px;
}
.title .headerImg {
  width: 100px;
  border-radius: 10px;
}
.headerText {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}
.headerText p {
  margin: 6px 0;
}
.headerText p:nth-child(1) {
  font-size: 20px;
  font-weight: 700;
  color: rgb(46, 44, 43);
  display: inline-block;
}
.headerText p:nth-child(2) {
  font-size: 16px;

  color: rgb(97, 96, 96);
  display: inline-block;
}

.headerBtn {
  display: flex;
  margin-left: 20px;
}
.headerBtn span {
  display: inline-block;
  padding: 5px 10px;
  color: rgb(210, 214, 218);
  border: 1px solid #ccc;
  margin-left: 20px;
  border-radius: 18px;
  margin-bottom: 10px;
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
}
.musicListTitle li {
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.musicListTitle li:nth-child(1) {
  flex: 2;
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
  width: 60%;
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
