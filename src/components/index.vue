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
            <Input size="large" placeholder="请输入要搜索的内容" v-model="keywords" @on-enter="search" search  ref="search"/>
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
                <a><li><Icon type="ios-contact" size="24"/>我的主页</li></a>
                <a><li><Icon type="ios-settings" size="24" />设置</li></a>
                <a><li><Icon type="ios-exit" size="24"/>退出</li></a>
              </div>
            </Poptip>
            </li>
        </div>
    </div>
</Menu>
<BackTop :height="100" >
    <Icon color="gray" type="md-arrow-round-up" size="50"/>
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
  data() {
    return {
      keywords: "" //搜索的关键字
    };
  },
  created() {
    //进入搜索页面前没有内容,阻止进入
    this.$router.beforeEach((to, from, next) => {
      if (
        to.path === "/news/search" &&
        this.$store.state.axiosDate.search.length === 0
      ) {
        this.$Message.error("请输入要搜索的内容");
        this.$refs.search.focus();
      } else {
        next();
      }
    });
  },
  computed: {
    noticeNum() {
      return this.$store.state.noticeNum;
    }
  },
  methods: {
    addNotice() {
      this.$store.commit("addNotice");
    },
    clearNotice() {
      this.$store.commit("clearNotice");
    },
    search() {
      this.$Loading.start();
      this.axios({
        url:
          "https://www.nnnnzs.cn:3000/api/getnews?keywords=" +
          this.keywords +
          ""
      })
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            this.$store.commit("clearNews", "search");
            this.$store.commit("set", { type: "search", data: data });
            this.$Loading.finish();
            this.$router.push("/news/search");
          }
        })
        .catch(err => {
          console.log(err);
          this.$Loading.error();
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
.avatar li {
  padding: 5px 0;
  font-size: 15px;
  text-decoration: #8590a6;
  text-align: left;
}
.avatar li:hover {
  background-color: #f6f6f6;
}
.avatar i {
  margin-right: 3px;
  color: #8590a6;
}
banner {
  margin-bottom: 10px;
}
.userinfo {
  float: right;
}
.ivu-input-wrapper {
  transition: width 0.5s;
}
</style>

