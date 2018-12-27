<template>
  <div id="newsList">
    <Card class="card" v-for="item in newsList" :data-id="item.ID" :key="item.ID">
      <a class="card-close" slot="extra">ｘ</a>
      <div class="source">类别:{{item.category}} 来源:{{item.author_name}}</div>
      <div class="source">
        <Tooltip :content="item.date|timeFormat" placement="right">
          <Time :time="item.date"/>
        </Tooltip>
      </div>
      <a @click="openDrawer(item.url,item);sendCnzz(item.title,item.author_name)" >
        <h2>{{item.title}}</h2>
      </a>
      <div class="imgList">
        <Carousel loop v-if="item.thumbnail_pic_s02 ">
          <CarouselItem v-if="item.thumbnail_pic_s ">
            <img :src="item.thumbnail_pic_s |setProtocol">
          </CarouselItem>
          <CarouselItem v-if="item.thumbnail_pic_s02 ">
            <img :src="item.thumbnail_pic_s02 |setProtocol">
          </CarouselItem>
          <CarouselItem v-if="item.thumbnail_pic_s03 ">
            <img :src="item.thumbnail_pic_s03 |setProtocol">
          </CarouselItem>
        </Carousel>
        <img :src="item.thumbnail_pic_s |setProtocol" v-else>
      </div>
      <div class="guide">
        <p>{{item.guide}}</p>
      </div>
    </Card>
    <Card id="learmore" class="card" >
      <div class="source">&nbsp;</div>
        <h2>&nbsp;</h2>
      <div class="imgList">
      </div>
      <div class="guide">
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
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
      page: 1,
      allowLoad: true
    };
  },
  filters: {
    setProtocol: function(value) {
      return value.replace("http://", "//");
    }
  },
  created() {
    //当前路由不是搜索页面才能进入
    if (this.$store.state.axiosDate[this.pathName].length == 0) {
      if (this.pathName !== "search") {
        console.log(this.pathName);
        this.search();
      }
    }
  },
  mounted() {
    let learmore = document.getElementById("learmore");
    let _this = this;
    window.addEventListener("scroll", function() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let eleTop = document.querySelector("#learmore").offsetTop;
      if (eleTop - 1596 <= scrollTop) {
        _this.loadMoreNews();
      }
    });
  },
  updated() {
    if (this.newsList.length == 0) this.search();
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
    type() {
      if (this.pathName == "sport") return "体育";
      else if (this.pathName == "technology") return "科技";
      else if (this.pathName == "hot") return "头条";
    }
  },
  methods: {
    openDrawer(url, content) {
      url = url.replace("http://", "//");
      this.$store.commit("setDrawerUrl", url);
      this.$store.commit("showContent", content);
      this.$store.commit("toggleDrawer");
    },
    search() {
      this.$Loading.start();
      this.axios({
        url: `${this.$store.state.host}/api/getnews?type=${this.type}&page=${
          this.page
        }`
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
    loadMoreNews(){
      if(this.allowLoad){

      this.page++;
      this.$Loading.start();
      this.allowLoad = false;
      this.axios({
        url:`${this.$store.state.host}/api/getnews?type=${this.type}&page=${this.page}`
      })
        .then(res => {
          if (res.status == 200) {
            let data = res.data.data;
            console.log(this.pathName);
            this.$store.commit("loadMore", { type: this.pathName, data: data });
            this.allowLoad = true;
            this.$Loading.finish();
          }
        })
        .catch(err => {
          console.log(err);
          this.$Loading.error();
        });
      }
    },
    sendCnzz(title,type){
      _czc.push(['_trackEvent', title, type]);
    }
  }
};
</script>
<style scoped>
#learmore .source{
  background: #7efaff;
  width: 100%;
  margin-bottom: 10px;
}
#learmore{
  overflow: hidden;
}
#learmore h2{
  background: #7efaff;
  width: 100%;
  margin-bottom: 10px;
}
#learmore .guide{
  margin-left: 270px;
}
#learmore .guide p{
  line-height: 22px;
  margin-top: 10px;
  width: 345px;
  background: #7efaff;
}

#learmore .imgList{
  height: 150px;
  width: 250px;
  margin: 0;
  background: #7efaff;
}
#learmore .source,
#learmore h2,
#learmore .imgList,
#learmore .guide p{
    background: #7efaff;
    background-image: linear-gradient(90deg,rgba(255, 255, 255, 0.15) 25%, transparent 25%);
    background-size: 20rem 20rem;
    animation: skeleton-stripes 1s linear infinite;
}
@keyframes skeleton-stripes {
    from {
        background-position: 0 0 ;
    }
    to {
        background-position: 20rem 0;
    }
}
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

