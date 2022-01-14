<template>
  <div class="home">
    <div class="recommendTitle">
      推荐歌单
      <span class="iconfont icon-qiehuanqiyou"></span>
    </div>

    <div class="recommend">
      <!-- 每日推荐歌曲 -->
      <div class="recommendItem" @click="RecommendSongBtn">
        <img class="image" src="~assets/img/04.png" alt="" />
        <div class="calendar">
          {{ getCalendar }}
        </div>
        <p class="name">每日推荐歌曲</p>
      </div>
      <!-- 每日推荐歌单 -->
      <div
        class="recommendItem"
        v-for="item in recommendList"
        :key="item.userId"
        @click="recommendBtn(item.id)"
      >
        <img class="image" :src="item.picUrl" alt="" />
        <span class="iconfont icon-zuihouyiyemoyexiayishou">
          {{ playCount(item.playCount) }}
        </span>
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "../../network/requestList"
export default {
  name: "Home.vue",
  data() {
    return {
      names: [],

      recommendList: [],
      recommendSong: [],
    }
  },
  created() {
    this.getRecommendFun()
  },
  computed: {
    // 获取当前日期
    getCalendar() {
      let day = new Date().getDate()
      let month = new Date().getMonth() + 1
      return day + "/" + month
    },
  },
  methods: {
    // 获取每日推荐歌单
    getRecommendFun() {
      getRecommend((res) => {
        console.log(res)
        this.recommendList = res.data.result
      })
    },

    // 播放数量过滤
    playCount(count) {
      switch (true) {
        case count / 100000000 >= 1:
          return Math.floor(count / 100000000) + "亿"
        case count / 10000 >= 1:
          return Math.floor(count / 10000) + "万"
        default:
          return count
      }
    },
    // 点击每日推荐歌曲跳转路由
    RecommendSongBtn() {
      this.$store.dispatch("recommendInfo")
      this.$router.push("/recommend")
    },

    recommendBtn(id) {
      console.log(id)
      this.$store.dispatch("recommendInfos", id)
      this.$router.push("/recommend")
    },
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  height: calc(100vh - 255px);
  overflow: hidden;
  overflow-y: scroll;
}
.home::-webkit-scrollbar {
  display: none;
}
.recommendTitle {
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-weight: 550;
  margin: 12px;
  color: rgb(70, 68, 66);
}

.recommend {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.recommendItem {
  position: relative;
  width: 18%;
  margin: 5px 1%;
  display: flex;
  flex-direction: column;
}

.recommendItem .iconfont {
  position: absolute;
  right: 6%;
  top: 2px;

  color: #f8f8f8;
  font-size: 14px;
}
.image {
  width: 100%;
  border-radius: 10px;
}
.recommendItem .image:hover {
  outline: 1px solid rgb(243, 240, 240);
}

.recommendItem .calendar {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);

  font-size: 20px;
  font-weight: 700;
  color: rgba(183, 109, 233, 0.7);
}
.name {
  width: 80%;
  margin-top: 1px;
  display: inline-block;

  overflow: hidden;

  text-overflow: ellipsis;

  display: -webkit-box;

  -webkit-box-orient: vertical;

  -webkit-line-clamp: 2;
}
.name:hover {
  color: rgb(199, 198, 194);
}
</style>
