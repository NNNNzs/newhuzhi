<template>
    <main>
        <div class="main-content">
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
                <img v-if="item.thumbnail_pic_s" :src="item.thumbnail_pic_s">
                <img v-if="item.thumbnail_pic_s02" :src="item.thumbnail_pic_s02" >
                <img v-if="item.thumbnail_pic_s02" :src="item.thumbnail_pic_s03" >
              </div>
            </Card>
        </div>
    </main>
</template>
<script>
export default {
  data() {
    return {
      card: [{ id: 0, content: "asdasd" }],
      id: 0,
      content: "1"
    };
  },
  computed: {
    newsList() {
      //ajax传回来的值
      return this.$store.state.axiosDate;
    },   
  },
  methods: {
    openDrawer(url){
      this.$store.commit('toggleDrawer');
      this.$store.commit('setDrawerUrl',url)
    },
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
.card a{
  text-decoration: none;
  color: #000;
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
  display: flex;
}
.imgList img {
  width: 30%;
  height: 80%;
  margin-right: 3%;
}
</style>

