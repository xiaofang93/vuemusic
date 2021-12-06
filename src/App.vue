<template>
  <div id="app">
    <top-bar></top-bar>
    <div class="wrapper">
      <left-menu />
      <router-view> </router-view>
      
    </div>
    <bottom-player />
  </div>
</template>
<script>
import TopBar from "./views/topbar/TopBar"
import LeftMenu from "./views/leftmenu/LeftMenu.vue"
import BottomPlayer from "./views/bottomplayer/BottomPlayer.vue"

export default {
  name: "app",
  components: {
    TopBar,
    BottomPlayer,
    LeftMenu,
    
  },
}
</script>
<style scope>
@import "./assets/css/base.css";
@import "./assets/css/iconfont.css";
/* #region */
body {
  font-family: var(--body-font);
  background-image: url(./assets/img/001.jpg);
  background-size: cover;
  border: 1px solid #ccc;
  min-width: 1280px;

  /* 关闭文本选择 */
  user-select: none;
}

#app {
  background: rgba(91, 123, 160, 0.5);
  border: 1px solid #ccc;
  margin: 20px;
  border-radius: 10px;
}

.wrapper {
  display: flex;
  overflow: hidden;
}
</style>
