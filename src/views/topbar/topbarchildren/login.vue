<template>
  <div class="login" v-show="isShow">
    <div class="wrappertitle">
      <span class="logintitle">账号密码登录 </span>
      <div class="iconfont icon-guanbi" @click="offLogin"></div>
    </div>
    <div class="handleLoginInput">
      <div>
        <div class="wrapper">
          <p class="iconfont icon-shouji"></p>
          <input
            type="text"
            @blur="phoneRegEvent"
            ref="inputPhone"
            v-model="phone"
            placeholder="请输入手机号码"
          />
        </div>
        <div class="prompt">{{ phonetitle }}</div>
      </div>
      <div>
        <div class="wrapper">
          <p class="iconfont icon-mima"></p>
          <input type="password" ref="inputPassword" v-model="password" placeholder="请输入密码" />
        </div>
        <div class="prompt">{{ msg }}</div>
      </div>
      <button class="buttonlogins" @click="buttonlogins">授权并登录</button>
    </div>
  </div>
</template>

<script>
import { loginForPhone } from "@/notework/requestList"
export default {
  name: "login",
  props: ["isShow"],
  data() {
    return {
      // 手机号
      phone: [],
      // 密码
      password: [],

      // 手机号输入提示
      phonetitle: "",

      // 网络请求验证开关
      isRequest: false,
      // 网络验证提示
      msg: "",
    }
  },
  methods: {
    // 关闭登陆界面的回调
    offLogin() {
      this.$emit("offLogin")
    },

    // 登录按钮回调
    buttonlogins() {
      // 1.前端验证
      // 手机号验证:
      // 1.内容为空
      // 2.手机号格式不正确
      // 3.手机格式正确,验证通过
      if (this.phone.length === 0) {
        // let cookie = window.localStorage.cookie
        // cookie.split(";;").map((item) => {
        //   if (item.includes("MUSIC_U")) {
        //     console.log(item)

        //     item.split(";").map((i) => {
        //       if (i.includes("MUSIC_U")) {
        //         console.log(i.split("=")[0])
        //         console.log(i.split("=")[1])
        //       }
        //     })
        //   }
        // })
        // console.log()
        // console.log(JSON.parse(window.localStorage.userInfo))

        console.log(this.$refs.inputPhone)
        this.$refs.inputPhone.placeholder = "手机号码不能为空"

        setTimeout(() => {
          this.$refs.inputPhone.placeholder = "请输入手机号码"
        }, 1500)
        return
      }
      if (this.password.length === 0) {
        this.$refs.inputPassword.placeholder = "密码不能为空"
        setTimeout(() => {
          this.$refs.inputPassword.placeholder = "请输入密码"
        }, 1500)
        return
      }
      if (this.isRequest) {
        loginForPhone(this.phone, this.password, (res) => {
          console.log(res)

          if (res.data.code === 200) {
            this.msg = "登录成功"
            // 将请求来的用户数据和cookie保存到本地中
            window.localStorage.cookie = res.data.cookie
            // 将请求过来的用户信息转换成JSON字符串类型存入本地
            window.localStorage.userInfo = JSON.stringify(res.data.profile)
            // 登录成功后关闭登录栏
            this.offLogin()
          } else {
            this.msg = "密码错误"
            setTimeout(() => {
              this.msg = ""
            }, 2000)
          }
        })
      }
    },
    // 手机号输出框失去焦点的回调
    // 手机号码前端验证
    phoneRegEvent(eve) {
      // 验证表单的正则表达式
      let phoneReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/

      if (!phoneReg.test(this.phone) && this.phone.length !== 0) {
        this.phonetitle = "手机号码格式不正确"
        setTimeout(() => {
          this.phonetitle = ""
        }, 2000)
      } else {
        this.isRequest = true
      }
    },
  },
}
</script>

<style scoped>
.login {
  color: rgb(34, 34, 34);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 35%;
  width: 45%;
  border-radius: 15px;
  background: rgba(190, 183, 199, 0.5);
}

.wrappertitle {
  margin-top: 15px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  position: relative;
}

.logintitle {
  margin-top: 20px;
  font-size: 20px;
}
.wrappertitle .icon-guanbi {
  position: absolute;
  right: 10px;
  top: -10px;
  color: #dfe0e0;
  font-size: 22px;
}

.handleLoginInput {
  width: 100%;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  text-align: center;
}

.wrapper {
  display: flex;
  align-items: center;
  height: 35px;
  width: 80%;
  margin: auto;
  margin-top: 20px;
}
.iconfont {
  font-size: 18px;
  margin-right: 3px;
}

.login input {
  height: 30px;
  width: 80%;
  flex: 1;
  border-radius: 8px;
  border-style: none;
  background: rgba(243, 243, 243, 0.5);
  color: #3f3f3b;
  font-size: 15px;
  outline-style: solid;

  outline-color: rgb(180, 178, 178);
}

.prompt {
  color: rgb(231, 134, 104);
  height: 20px;
  margin: 0;
  /* border: 1px solid #ccc; */
}
.buttonlogins {
  height: 38px;
  width: 80%;
  margin: auto;
  border-radius: 8px;
  border: 1px solid #ccc;
  border-radius: 2px;
  line-height: 38px;
  color: #ffffff;
  background-color: #1e6fff;
}
</style>
