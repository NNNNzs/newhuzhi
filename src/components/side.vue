<template>
<div class="main-side">
    <Affix>
    <Card>
        <div class="categoryList">
            <li><a><Icon size="30" type="ios-flash" /><p>LIVE</p></a></li>
            <li><a><Icon size="30" type="ios-book"  /><p>书店</p></a></li>
            <li><a><Icon size="30" type="md-flower" /><p>圆桌</p></a></li>
            <li><a><Icon size="30" type="ios-nutrition"/><p>专栏</p></a></li>
            <li><a><Icon size="30" type="logo-usd" /><p>LIVE</p></a></li>
        </div>
    </Card>
    <Card >
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Classic film
        </p>
    </Card>
    <Card >
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            Classic film
        </p>
    </Card>
    </Affix>
</div>
</template>
<script>
export default {
    
}

</script>
<style>
.categoryList{
    list-style: none;
    display: flex;
    flex-wrap: wrap;
}
.categoryList li{
    width: 33%;
    padding: 10px;
}
</style>
