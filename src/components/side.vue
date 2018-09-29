<template>
<div class="main-side">
    <Affix>
    <Card>
        <div class="categoryList">
            <li><a><Icon size="30" type="ios-flash" color="#FFCF00"/><p>LIVE</p></a></li>
            <li><a><Icon size="30" type="ios-book"  color="#43D480"/><p>书店</p></a></li>
            <li><a><Icon size="30" type="md-flower" /><p>圆桌</p></a></li>
            <li><a><Icon size="30" type="ios-nutrition"/><p>专栏</p></a></li>
            <li><a><Icon size="30" type="logo-usd" /><p>付费咨询</p></a></li>
        </div>
    </Card>
    <div class="adv">
        <a class="adv-close">X</a>
        <img class="adv-img" src="../img/loading.gif">
    </div>
    <Card >
        <p slot="title">
        </p>
    </Card>
    </Affix>
    <Drawer title="新闻预览" :closable="false" v-model="Drawer" width="30%" @on-close="drawerClose">
        <iframe id="frame" :src="DrawerUrl" frameborder="0">
        </iframe>
    </Drawer>
</div>
</template>
<script>
export default {
    methods:{
        drawerClose(){
            this.$store.commit('toggleDrawer');
            console.log('drawerClose')

        }
    },
    computed:{
        Drawer(){
            return this.$store.state.Drawer
        },
        DrawerUrl(){
            return this.$store.state.DrawerUrl;
        }
    }
}

</script>
<style scoped>
.categoryList{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.categoryList li{

    width: 33%;
    padding: 10px;
}
.categoryList p{
    color: #8590a6;
}
.adv{
    position: relative;
}
#frame{
    width: 100%;
    height: 100%;
}
.adv-img{
    margin: 5px 0;
    width: 100%;
    height: 100%;
}
.adv-close{
    display: none;
    position: absolute;
    top: 15px;
    right: 15px;
}
.adv:hover .adv-close{
    display: block;
}
</style>
