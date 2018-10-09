<template>
<div class="bg">
    <div id="login">
        <ul class="type">
            <li :class="{active:isSignup}" @click="toggleType(true)">注册</li>
            <li :class="{active:!isSignup}"@click="toggleType(false)">登录</li>
        </ul>
        <div class="inputs">
            <div v-if="isSignup" class="input-group" >
                <h2>注册</h2>
                <p>账号</p>
                <Input size="large" prefix="md-contact" placeholder="账号" v-model="signup.account" @on-change="checkInput('account')"/>
                <p>昵称</p>
                <Input size="large" prefix="md-person" placeholder="昵称" v-model="signup.nickname" @on-change="checkInput('nickname')"/>
                <p>密码</p>
                <Input size="large" prefix="md-lock" placeholder="密码" v-model="signup.password" 
                :type="psdType.type" :icon="psdType.icon" @on-click="changPsdInputType" @on-change="checkInput('password')"/>
                <Button>注册</Button>
            </div>
            <div v-else class="input-group">
                <h2>登录</h2>
                <p>账号</p>
                <Input size="large" prefix="md-contact" placeholder="账号" v-model="login.account"/>
                <p>密码</p>
                <Input size="large" prefix="md-lock" placeholder="密码" v-model="login.password" :type="psdType.type" :icon="psdType.icon" @on-click="changPsdInputType"/>
                <Button>登录</Button>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      isSignup: true,
      psdType: {
        type: "password",
        icon: "md-eye-off"
      },
      signup: { account: "", nickname: "", password: "" },
      login: { account: "", password: "" }
    };
  },
  methods: {
    toggleType(boole) {
      this.isSignup = boole;
    },
    changPsdInputType() {
      if (this.psdType.type == "password") {
        this.psdType = { type: "text", icon: "md-eye" };
      } else {
        this.psdType = { type: "password", icon: "md-eye-off" };
      }
    },
    checkInput(type) {
      switch (type) {
        case accuont:
          this.signup.account;
        case nickname:
          this.signup.nickname;
        case password:
          this.signup.password;
          console.log()
      }
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
    calc(50vw - var(--login-width) / 2);
  /* border-top-right-radius: 50%;
  border-bottom-right-radius: 50%; */
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
.inputs input {
  margin-bottom: 15px;
}
</style>

