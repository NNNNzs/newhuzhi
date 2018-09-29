<template>
<header>
<Menu mode="horizontal" theme="light" active-name="homepage">
    <div class="main-container">
        <MenuItem name="logo">
            <img style="height:30px;margin-bottom:-10px;"  src="../assets/logo.png">
        </MenuItem>
        <MenuItem name="homepage">
            首页
        </MenuItem>
        <MenuItem name="explore">
            留言
        </MenuItem>
        <MenuItem name="topic" >
            关于
        </MenuItem>
        <MenuItem name="search">
            <Input size="large" v-model="keywords" @on-enter="search"  search @on-focus="inputFocus" @on-blur="inputBlur" ref="search"/>
        </MenuItem>
        <MenuItem name="ask">
            <Button type="primary" @click="addNotice" ref="ask">提问</Button>
        </MenuItem>
        <div class="userinfo" >
            <MenuItem name= "Notice" >
            <Badge :count="noticeNum" :offset=[15,5]>
                <Icon type="md-notifications" size="24" @click="clearNotice"/>
            </Badge>
            </MenuItem>
            <MenuItem name= "chat" >
                <Icon type="ios-chatbubbles" size="24"/>
            </MenuItem>
            <MenuItem name= "avatar" class="avatar">
            <Poptip placement="top">
              <Avatar src="https://tvax4.sinaimg.cn/crop.0.0.996.996.180/8b1fa16fly8fiu0vgmb4nj20ro0roabo.jpg" size="large" />
              <div slot="content">
                <a>我的主页</a>
                <a>设置</a>
                <a>退出</a>
              </div>
            </Poptip>
            </MenuItem>
        </div>
    </div>
</Menu>
<BackTop :height="100" >
    <Icon color="gray" type="md-arrow-round-up" size="24"/>
</BackTop>
</header>
</template>

<script>
import newsJson from "../assets/news.json"
import nMain from "./main.vue";
import nSide from "./side.vue";
export default {
  components:{
    nMain,
    nSide
  },
  data(){
    return{
      keywords:''
    }
  },
  created(){
    this.search();
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
      // 用真实数据模拟实时数据减少请求
      // console.log(newsJson)
      // if ((newsJson.result.stat== "1" )) {
      //   let data = newsJson.result.data
      //   this.$store.commit("set",data);
      // }
      this.axios({
        url:'http://www.nnnnzs.cn:3000/api/getnews?keywords='+this.keywords+'',
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

