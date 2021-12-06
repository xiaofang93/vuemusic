<template>
  <div v-show="isUserShow" class="userSet">
    <div class="userSetDetail">
      <div class="userSetDetailList">
        <li>0</li>
        <li>动态</li>
      </div>
      <div class="userSetDetailList">
        <li>3</li>
        <li>关注</li>
      </div>
      <div class="userSetDetailList">
        <li>0</li>
        <li>粉丝</li>
      </div>
    </div>

    <div class="userSets">
      <div class="userSetsList">
        <span class="iconfont icon-tianjiayonghu">会员中心</span>
        <span class="iconfont icon-denglu"></span>
      </div>
      <div class="userSetsList">
        <span class="iconfont icon-tianjiayonghu">等级</span>
        <span class="iconfont icon-denglu"></span>
      </div>
      <div class="userSetsList">
        <span class="iconfont icon-tianjiayonghu">个人信息设置</span>
        <span class="iconfont icon-denglu"></span>
      </div>
      <div class="userSetsList">
        <span class="iconfont icon-kaiqi" @click="clearUser">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSet",
  props: {
    isUserShow: {},
  },
  methods: {
    //   清除用户的登录缓存
    clearUser() {
      window.localStorage.clear()
      this.$emit("offUserSet")
    },
  },
}
</script>

<style scoped>
.userSet {
  position: relative;
  top: 180px;
  right: 130px;
  width: 260px;
  height: 300px;
  z-index: 9;
  background-color: rgba(115, 84, 153, 0.9);
  border: 1px solid rgb(116, 111, 111);
  border-top: none;
  border-radius: 10px;
  box-shadow: 2px 2px 6px 1px rgba(64, 64, 65, 0.2);
  cursor: pointer;
  user-select: none;
}

/* 用户基本信息 */
.userSetDetail {
  margin: auto;
  width: 90%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgb(133, 130, 130);
}

.userSetDetailList li {
  list-style: none;
  text-align: center;
}
.userSetDetailList li:nth-child(1) {
  margin-top: 10px;
}
.userSetDetailList li:nth-child(2) {
  margin-bottom: 10px;
}

/* 操作按钮菜单 */
.userSets {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.userSetsList {
  height: 35px;
  line-height: 35px;
  margin: 5px 15px;
  border-bottom: 1px solid rgb(157, 160, 161);
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
}

.userSetsList:hover {
  background-color: rgb(123, 101, 203);
  border-bottom: var(--theme);
}

.userSetsList span:nth-child(2) {
  font-size: 22px;
}
</style>
