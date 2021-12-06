<template>
  <div class="header">
    <div class="menu-circle"></div>
    <div class="header-menu">
      <a class="menu-link is-active" href="#">音乐馆</a>
      <a class="menu-link notify" href="#">音乐电台</a>
      <a class="menu-link" href="#">排行榜</a>
    </div>
    <div class="search-bar">
      <input type="text" placeholder="搜索音乐" v-model="search" />
    </div>
    <div class="header-profile">
      <img v-if="!userImg" class="profile-img" src="~assets/img/04.png" alt="" />
      <img v-else class="profile-img" :src="userImg" alt="" />

      <span v-if="!userName" class="loginbtn" @click="loginbtn">登录</span>
      <span v-else class="loginbtn">
        {{ userName }}
        <span
          class="iconfont icon-xiala1"
          :style="isUserShow ? 'color: red' : 'color: black'"
          @click="handleUser"
        ></span>
      </span>
      <!-- 用户设置界面 -->
      <user-set :isUserShow="isUserShow" @offUserSet="offUserSet" />
    </div>

    <!-- 登录界面 -->
    <login :isShow="isShow" @offLogin="offLogin" />

    <user-info />
  </div>
</template>

<script>
import login from "./topbarchildren/login.vue"
import UserSet from "./topbarchildren/UserSet.vue"
import UserInfo from "./userinfo/UserInfo.vue"
export default {
  name: "TopBar.vue",

  data() {
    return {
      // 登录界面开关
      isShow: false,
      // 用户设置界面开关
      isUserShow: false,
      userName: "",
      userImg: "",
      search: "",
    }
  },
  components: {
    login,
    UserInfo,
    UserSet,
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    loginbtn() {
      this.isShow = !this.isShow
    },
    offLogin() {
      this.isShow = false
      this.getUserInfo()
    },
    // 判断登录状态.而是否显示用户信息
    getUserInfo() {
      if (window.localStorage.userInfo) {
        let userInfo = JSON.parse(window.localStorage.userInfo)
        // console.log(userInfo)
        this.userName = userInfo.nickname
        this.userImg = userInfo.avatarUrl
      } else {
        this.userName = ""
        this.userImg = ""
      }
    },
    // 点击用户圆点下拉按钮的回调
    handleUser() {
      this.isUserShow = !this.isUserShow
    },
    // 子组件内 退出登录 按钮回调
    offUserSet() {
      this.isUserShow = false
      this.getUserInfo()
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  border-bottom: 1px solid rgb(95, 94, 94);
  padding: 0 30px;
  white-space: nowrap;
  color: #cdcecf;
}
@media screen and (max-width: 480px) {
  .header {
    padding: 0 16px;
  }
}
.header-menu {
  display: flex;
  align-items: center;
}
.header-menu a {
  border: 1px solid #ccc;
  padding: 20px 20px;
  text-decoration: none;
  color: var(--inactive-color);
  border-bottom: 2px solid transparent;
  transition: 0.3s;
}
@media screen and (max-width: 610px) {
  .header-menu a:not(.main-header-link) {
    display: none;
  }
}
.header-menu a:hover {
  border-bottom: 2px solid var(--theme-color);
}

.notify {
  position: relative;
}

@media screen and (max-width: 1055px) {
  .notify {
    display: none;
  }
}

.menu-circle {
  width: 15px;
  height: 15px;
  background-color: #f96057;
  border-radius: 50%;
  box-shadow: 24px 0 0 0 #f8ce52, 48px 0 0 0 #5fcf65;
  margin-right: 120px;
  flex-shrink: 0;
}
@media screen and (max-width: 945px) {
  .menu-circle {
    display: none;
  }
}

.search-bar {
  height: 40px;
  display: flex;
  width: 100%;
  max-width: 300px;
  border-radius: 4px;
}
.search-bar input {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background-color: var(--search-bg);
  border-radius: 4px;
  font-size: 15px;
  font-weight: 500;
  padding: 0 20px 0 40px;
  background-size: 14px;
}

.header-profile {
  width: 400px;
  display: flex;
  align-items: center;
}

.loginbtn {
  font-size: 15px;
  color: rgb(226, 235, 243);
  cursor: default;
}

.profile-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  -o-object-fit: cover;
  object-fit: cover;
  border: 2px solid var(--theme-color);
  margin: 0 8px 0 10px;
}
</style>
