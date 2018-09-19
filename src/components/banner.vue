<template>
<header>
<Menu mode="horizontal" theme="dark" active-name="homepage">
    <div class="main-container">
        <MenuItem name="logo">
            <img style="height:30px;margin-bottom:-10px;"  src="../assets/logo.png">
        </MenuItem>
        <MenuItem name="homepage">
            首页
        </MenuItem>
        <MenuItem name="explore">
            发现
        </MenuItem>
        <MenuItem name="topic">
            话题
        </MenuItem>
        <MenuItem name="search">
            <Input size="large" search @on-focus="inputFocus" @on-blur="inputBlur" ref="search"/>
        </MenuItem>
        <MenuItem name="ask">
            <Button type="dark" @click="add()" ref="ask">提问</Button>
        </MenuItem>
        <div class="userinfo" >
            <MenuItem name= "Notice" >
            <Badge :count="noticeNum" :offset=[15,5]>
                <Icon type="md-notifications" size="24" @click="clear()"/>
            </Badge>
            </MenuItem>
            <MenuItem name= "chat" >
                <Icon type="ios-chatbubbles" size="24"/>
            </MenuItem>
            <MenuItem name= "avatar" >
            <Avatar src="https://pic4.zhimg.com/0fe5858b956ab2e5fe5a0deca8a6e59f_is.jpg" size="large" />
            </MenuItem>
        </div>
    </div>
</Menu>
</header>
</template>

<script>
export default {
  data() {
    return {
      noticeNum: 3
    }
  },
  methods:{
      add(){
          this.noticeNum++;
      },
      clear(){
          this.noticeNum = 0;
      },
      inputFocus(){
          this.$refs.search.$el.style.width="350px"
          this.$refs.ask.$el.style.display="none"
      },
      inputBlur(){
          this.$refs.search.$el.style.width="";
          setTimeout(()=>{this.$refs.ask.$el.style.display=""},200)
        //   console.log(this.$refs.ask.$el.style.zoom)
      }
  }
};
</script>
<style>
.userinfo{
  float: right;
}
.ivu-input-wrapper{
    transition: width .5s;
}
/* .ivu-btn{
    transition: zoom .5s;
} */
</style>

