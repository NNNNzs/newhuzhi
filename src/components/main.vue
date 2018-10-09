<template>
    <main>
            <Card class="cardHeader" dis-hover>
                <router-link to="/news/hot"><span><Icon type="md-help" />头条</span></router-link >
                <router-link to="/news/technology"><span><Icon type="ios-paper" />科技</span></router-link >
                <router-link to="/news/sport"><span><Icon type="ios-create" />体育</span></router-link >
                <router-link to="/news/search"><span><Icon type="logo-javascript" />搜索</span></router-link >
            </Card>
            <router-view></router-view>
    </main>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    openDrawer(url) {
      url = url.replace("http://", "//");
      this.$store.commit("setDrawerUrl", url);
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>
<style scoped>
.cardHeader {
  font-size: 18px;
  text-align: left;
  margin-bottom: 10px;
}
.cardHeader a {
  text-decoration: none;
  color: #000;
}
.cardHeader .router-link-exact-active {
  color: #2d8cf0;
}
.cardHeader span {
  display: inline-block;
  margin: 0 15px;
}
</style>

