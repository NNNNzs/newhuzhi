<template>
<div>
<Card class="card" v-for="item in newsList" :key="item.uniquekey">
    <a class='card-close' slot="extra">ｘ</a>
    <div class="source">类别:{{item.category}} 来源:{{item.author_name}}</div>
    <div class="source">
        <Tooltip :content="item.date|timeFormat" placement="right">
    <Time :time="item.date" />
        </Tooltip>
    </div>
    <a  @click="openDrawer(item.url,item)">
    <h2>{{item.title}}</h2>
    </a>
    <div class="imgList">
    <Carousel loop  v-if="item.thumbnail_pic_s02">
        <CarouselItem v-if="item.thumbnail_pic_s">
        <img :src="item.thumbnail_pic_s">
        </CarouselItem>
        <CarouselItem v-if="item.thumbnail_pic_s02">
        <img :src="item.thumbnail_pic_s02">
        </CarouselItem>
        <CarouselItem v-if="item.thumbnail_pic_s03">
        <img :src="item.thumbnail_pic_s03">
        </CarouselItem>
    </Carousel>
    <img :src="item.thumbnail_pic_s" v-else>
    </div>
    <div class="guide">
    <p>{{item.guide}}</p>
    </div>
    </Card>
</div>
</template>
<script>
export default {
  data() {
    return {
      keywords: "",
      pathName: "",
      page:1
    };
  },
  created() {
    //当前路由不是搜索页面才能进入
    if (this.$store.state.axiosDate[this.pathName].length == 0) {
      if (this.pathName !== "search") {
        console.log(this.pathName)
        this.search();
      }
    }
  },
  updated(){
    if(this.newsList.length==0)
    this.search();
  },
  watch: {
    $route: {
      handler(router) {
        this.pathName = router.name;
      },
      immediate: true
    }
  },
  computed: {
    newsList() {
      return this.$store.state.axiosDate[this.pathName];
    },
    type(){
        if(this.pathName=='sport')
        return '体育'
        else if(this.pathName=='technology')
        return '科技';
        else if(this.pathName=='hot')
        return '头条'
      }
  },
  methods: {
    openDrawer(url,content) {
      url = url.replace("http://", "//");
      this.$store.commit("setDrawerUrl", url);
      this.$store.commit("showContent", content);
      // console.log(content);
      this.$store.commit("toggleDrawer");
    },
    search() {
      this.$Loading.start();
      this.axios({
        url:`${this.$store.state.host}/api/getnews?type=${this.type}&page=${this.page}`
      })
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            console.log(this.pathName);
            this.$store.commit("set", { type: this.pathName, data: data });
            this.$Loading.finish();
          }
        })
        .catch(err => {
          console.log(err);
          this.$Loading.error();
        });
    },
  }
};
</script>
<style>
.card {
  margin-bottom: 10px;
  padding: 0;
  overflow: auto;
}
.card-close {
  color: initial;
  display: none;
}
.card:hover .card-close {
  display: block;
}
.card .source {
  text-align: left;
  color: #8590a6;
}
.card h2 {
  text-align: left;
  margin: 3px 0;
}

.imgList {
  width: 40%;
  float: left;
  margin: 5px;
}
.imgList img {
  width: 100%;
  margin-right: 3%;
}
.guide {
  /* margin: 0 40px; */
  margin-left: 40px;
  text-align: left;
  text-indent: 2rem;
}
</style>

