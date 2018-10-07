<template>
<div>
<header>
<Menu mode="horizontal" theme="light" active-name="homepage">
    <div class="main-container">
        <li name="logo" class="ivu-menu-item">
            <img style="height:30px;margin-bottom:-10px;"  src="../assets/logo.png">
        </li>
        <MenuItem name="homepage" to="/news">
            首页
        </MenuItem>
        <MenuItem name="explore" to="/guestbook">
            留言
        </MenuItem>
        <MenuItem name="topic" to="/about">
            关于
        </MenuItem>
        <li name="search" class="ivu-menu-item">
            <Input size="large" v-model="keywords" @on-enter="search"  search @on-focus="inputFocus" @on-blur="inputBlur" ref="search"/>
        </li>
        <li name="ask" class="ivu-menu-item">
            <Button type="primary" @click="addNotice" ref="ask">提问</Button>
        </li>
        <div class="userinfo" >
            <li name= "Notice" class="ivu-menu-item">
            <Badge :count="noticeNum" :offset=[15,5]>
                <Icon type="md-notifications" size="24" @click="clearNotice"/>
            </Badge>
            </li>
            <li name= "chat" class="ivu-menu-item">
                <Icon type="ios-chatbubbles" size="24"/>
            </li>
            <li name= "avatar" class="avatar ivu-menu-item" >
            <Poptip placement="top">
              <Avatar src="https://tvax4.sinaimg.cn/crop.0.0.996.996.180/8b1fa16fly8fiu0vgmb4nj20ro0roabo.jpg" size="large" />
              <div slot="content">
                <a>我的主页</a>
                <a>设置</a>
                <a>退出</a>
              </div>
            </Poptip>
            </li>
        </div>
    </div>
</Menu>
<BackTop :height="100" >
    <Icon color="gray" type="md-arrow-round-up" size="24"/>
</BackTop>
</header>
<div class="main-container">
  <div class="main-content">
    <router-view></router-view>
  </div>
    <n-side></n-side>
</div>
</div>
</template>

<script>
import nMain from "./main.vue";
import nSide from "./side.vue";
export default {
  components: {
    nMain,
    nSide
  },
  data(){
    return{
      keywords:''
    }
  },
  computed:{
    noticeNum(){
      return this.$store.state.noticeNum
    }
  },
  methods: {
    addNotice() {
      this.$store.commit("addNotice")
    },
    clearNotice() {
      this.$store.commit("clearNotice")
    },
    inputFocus() {
      this.$refs.search.$el.style.width = "350px";
      this.$refs.ask.$el.style.display = "none";
    },
    inputBlur() {
      this.$refs.search.$el.style.width = "";
      setTimeout(() => {
        this.$refs.ask.$el.style.display = "";
      }, 200);
    },
    search() {
      console.log(this.keywords)
      this.axios({
        url:'https://www.nnnnzs.cn:3000/api/getnews?keywords='+this.keywords+'',
      }).then(res => {
        if ((res.status == 200 )) {
            let data = res.data.data;
            this.$store.commit("set",data);
          }
        });
    }
  }
};
</script>
<style scoped>
.main-content {
  width: 650px;
  float: left;
}
.main-container {
  margin-top: 10px;
  width: 1000px;
  margin: 0 auto;
}
.main-side {
  margin-left: 10px;
  width: 330px;
  float: left;
}
.avatar p{
  padding: 5px 0px;
  text-decoration: #8590a6;
  text-align: left;
}
banner{
  margin-bottom: 10px;
}
.userinfo {
  float: right;
}
.ivu-input-wrapper {
  transition: width 0.5s;
}
</style>

