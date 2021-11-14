<template>
  <div class="bottonplayer">
    <div class="songdetail">
      <img class="songimage" src="~assets/img/03.png" alt="" />
      <div class="songtext">
        <p>歌曲名称</p>
        <p>歌手</p>
      </div>
    </div>
    <div class="playerControl">
      <div class="playerImg">
        <span class="iconfont icon-suijibofang1"></span>
        <span class="iconfont icon-diyiyeshouyeshangyishou"></span>
        <span class="iconfont icon-zanting"></span>
        <span class="iconfont icon-zuihouyiyemoyexiayishou"></span>
        <span class="iconfont icon-24gf-volumeMiddle"></span>
      </div>
      <div class="progress">
        <span>00:00</span>
        <span class="allTime">
          <span class="playTime"></span>
        </span>
        <span>03:28</span>
      </div>
    </div>

    <div class="rightPlayerControl">
      <span class="iconfont icon-suijibofang1"></span>
      <span class="iconfont icon-diyiyeshouyeshangyishou"></span>
      <span class="iconfont icon-zanting"></span>
      <span class="iconfont icon-zuihouyiyemoyexiayishou"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottonPlayer",
  data() {
    return {}
  },
}
</script>

<style scoped>
.bottonplayer {
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
}
.songtext {
  margin-left: 10px;
  color: #ccc;
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
}

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

/* 右边控制台 */
.rightPlayerControl .iconfont {
  font-size: 30px;
}
</style>
