<template>
<div class="bg">
    <div id="login">
        <ul class="type">
            <li :class="{active:isSignup}" @click="toggleType(true)">注册</li>
            <li :class="{active:!isSignup}" @click="toggleType(false)">登录</li>
        </ul>
        <div class="inputs">
            <form v-if="isSignup" class="input-group">
                <h2>注册</h2>
                <p>账号</p>
                <Input size="large" prefix="md-contact" placeholder="请输入英语数字下划线,4-15个字符" v-model="signup.account" 
                @on-change="checkInput('account')" @on-blur="isRepeat"/>
                <p>昵称</p>
                <Input size="large" prefix="md-person" placeholder="3-15位中英文，数字，下划线，减号" v-model="signup.nickname" @on-change="checkInput('nickname')"/>
                <p>密码</p>
                <Input size="large" prefix="md-lock" placeholder="请输入6位以上密码" v-model="signup.password" 
                :type="psdType.type" :icon="psdType.icon" @on-click="changPsdInputType" @on-enter="register" @on-change="checkInput('password')"/>
                <Button @click="register">注册</Button>
            </form>
            <form v-else class="input-group" >
                <h2>登录</h2>
                <p>账号</p>
                <Input size="large" prefix="md-contact" placeholder="账号" 
                @on-change="checkInput('loginAccount')" v-model="login.account"/>
                <p>密码</p>
                <Input size="large" prefix="md-lock" placeholder="密码" @on-enter="logins" v-model="login.password" :type="psdType.type" :icon="psdType.icon" @on-click="changPsdInputType"/>
                <Button @click="logins">登录</Button>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      isSignup: true, //页面显示是注册还是登录
      psdType: {
        type: "password",
        icon: "md-eye-off"
      },
      signup: { account: "", nickname: "", password: "" },
      flags: {
        //用于鉴别是否允许发送
        account: false,
        nickname: false,
        password: false,
        loginAccount: false
      },
      login: { account: "", password: "" }
    };
  },
  methods: {
    toggleType(boolean) {
      this.isSignup = boolean;
    },
    changPsdInputType() {
      //切换密码框是否显示明文
      this.psdType.type == "password"
        ? (this.psdType = { type: "text", icon: "md-eye" })
        : (this.psdType = { type: "password", icon: "md-eye-off" });
    },
    checkInput(type) {
      //先判断是不是有空格,有报错
      if (/[ ]+/.test(this.signup[type])) {
        this.$Message.error("不应该有空格");
        return false;
      }
      switch (type) {
        case "account": {
          let value = this.signup.account;
          let flag = /^\w{1,15}$/.test(value);
          if (!flag) {
            this.flags.account = false;
            this.$Message.error("输入英文数字下划线");
          } else {
            this.flags.account = 1;
          }
          break;
        }
        case "nickname": {
          //支持中文
          let value = this.signup.nickname;
          let flag = /^[\u4e00-\u9fa5A-Za-z0-9-_]{0,15}$/.test(value);
          flag
            ? (this.flags.nickname = true)
            : this.$Message.error("15个字以内");
          break;
        }
        case "password": {
          if (this.signup.password.length < 6) break;
          let value = this.signup.password;
          let flag = /[a-zA-Z\d_]{6,}/.test(value);
          flag ? (this.flags.password = true) : this.$Message.error("6位以上");
          break;
        }
        case "loginAccount": {
          let value = this.login.account;
          let flag = /^\w{1,15}$/.test(value);
          if (!flag) {
            this.flags.loginAccount = false;
            this.$Message.error("输入英文数字下划线");
          } else {
            this.flags.account = true;
          }
          break;
        }
      }
    },
    isRepeat() {
      //异步判断注册的账号是否重复
      //首先判断格式是否正确
      if (this.flags.account !== 1) {
        return false;
      }
      this.axios({
        data: { type: "isRepeat", account: this.signup.account },
        url: this.$store.state.host + "/api/register",
        method: "post"
      }).then(data => {
        console.log(data.data);
        if (data.data.status === "success") {
          this.flags.account = true;
          return false; //如果不重复返回false
        } else {
          this.flags.account = false;
          this.$Message.error("该账号已被注册");
          return true; //如果重复返回真
        }
      });
    },
    register() {
      if (!this.flags.nickname || !this.flags.account || !this.flags.password) {
        this.$Message.error("请输入正确");
        return false;
      }
      this.axios({
        data: { type: "register", data: this.signup },
        url: this.$store.state.host+ "/api/register",
        method: "post"
      }).then(rep => {
        console.log(rep)
        if(rep.data.status==='error'){
          this.$Message.error(rep.data.data);
        }
        else if(rep.data.status==='success'){
          this.login.account=this.signup.account;
          this.login.password=this.signup.password;
          this.flags.account ==true;
          this.logins();
        }
      });
      this.flags.nickname,this.flags.account,this.flags.password=false;
    },
    logins() {
      if (!this.flags.account) {
        return;
      }
      this.axios({
        withCredentials: true, //带cookie
        data: {
          account: this.login.account,
          password: this.login.password
        },
        url: this.$store.state.host+"/api/login",
        method: "post"
      }).then(rep => {
        console.log(rep);
        if (rep.data.status === "success") {
          this.$store.commit("login", rep.data.data);
          this.$router.push("/");
        } else {
          this.$Message.error(rep.data.data);
        }
      });
    }
  }
};
</script>
<style scoped>
#login {
  --login-width: 765px;
  --login-heigt: 374px;
  position: fixed;
  width: var(--login-width);
  height: var(--login-heigt);
  background-color: rgba(255, 255, 255, 0.3);
  margin: calc(50vh - var(--login-heigt) / 2)
    calc(50vw - var(--login-width) / 2); /*计算居中*/
}
.bg {
  width: 100vw;
  height: 100vh;
  background-image: url("../img/login_bg.jpg");
  background-repeat: round;
  background-size: 100% 100%;
}
.type {
  float: left;
  height: 100%;
  width: 13%;
  border-right: solid 1px rgba(255, 255, 255, 0.5);
}
.type li {
  font-size: 18px;
  background-color: solid 1px rgba(255, 255, 255, 1);
  padding: 25%;
  height: 50%;
  text-align: center;
  line-height: 150px;
  list-style: none;
}
.type .active {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  transition: all 0.5s;
}
.inputs {
  float: left;
  margin-top: 5%;
  margin-left: 10%;
  width: 50%;
}
.inputs .input-group h2 {
  text-align: center;
}
.inputs .input-group {
  height: 100%;
  text-align: left;
  /* display: flex;
  flex-direction: column;
  justify-content: space-around; */
}
.inputs .input-group .ivu-input-wrapper {
  margin-bottom: 30px;
}
</style>

