<template>
  <div class="left-side">
    <div class="musictitle">在线音乐</div>
    <div class="sideItem">
      <span class="iconfont icon-tuijian"></span>
      推荐
    </div>

    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
    <div class="sideItem">
      <span class="iconfont"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
}
</script>

<style scoped>
.left-side {
  height: calc(100vh - 300px);
  flex-basis: 150px;
  padding: 22px;
  border-right: 1px solid #ccc;
  color: rgb(193, 221, 223);
  font-size: 16px;
}
.musictitle{
  color: rgb(241, 220, 220);
  height: 30px;
  font-size: 13px;
}
.sideItem {

  line-height: 30px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.sideItem:hover {
  background-color: rgb(123, 101, 203);
  border-bottom: var(--theme);
}
.sideItem .iconfont{
  font-size: 20px;
  margin: 0 6px;
}
</style>
