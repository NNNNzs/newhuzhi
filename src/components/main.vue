<template>
    <main>
            <Card class="cardHeader" dis-hover>
                <a><span><Icon type="md-help" />提问</span></a>
                <a><span><Icon type="ios-paper" />回答</span></a>
                <a><span><Icon type="ios-create" />写文章</span></a>
                <a><span><Icon type="logo-javascript" />想法</span></a>
            </Card>
            <Card class="card" v-for="item in newsList" :key="item.uniquekey">
              <a class='card-close' slot="extra">ｘ</a>
              <div class="source">类别:{{item.category}} 来源:{{item.author_name}}</div>
              <div class="source">
                 <Tooltip :content="item.date" placement="top">
                <Time :time="item.date" />
                 </Tooltip>
              </div>
              <a  @click="openDrawer(item.url)">
                <h2>{{item.title}}</h2>
              </a>
              <div class="imgList">
                <Carousel loop autoplay v-if="item.thumbnail_pic_s02">
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
    </main>
</template>
<script>
export default {
  data() {
    return {
      keywords:''
    };
  },
  created(){
    this.search();
  },
  computed: {
    newsList() {
      return this.$store.state.axiosDate;
    },   
  },
  methods: {
    openDrawer(url){
      url = url.replace('http://','//');
      this.$store.commit('setDrawerUrl',url)
      this.$store.commit('toggleDrawer');
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
<style>
.main-content {
  width: 650px;
  float: left;
}
.card {
  margin-bottom: 10px;
  padding: 0px;
  overflow:auto;
}
.ivu-tooltip-popper{
  position: fixed;
  z-index: 10;
}
.card-close{
  color: initial;
  display: none;
}
.card:hover .card-close{
  display: block;
}
.card .source {
  text-align: left;
  color: #8590a6;
}
.card h2{
  text-align: left;
  margin: 3px 0;
}
.cardHeader {
  font-size: 18px;
  text-align: left;
  margin-bottom: 10px;
}
.cardHeader a {
  text-decoration: none;
  color: #000;
}
.cardHeader span {
  display: inline-block;
  margin: 0 15px;
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
.guide{
  /* margin: 0 40px; */
  margin-left: 40px;
  text-align: left;
  text-indent:2rem;
}
</style>

