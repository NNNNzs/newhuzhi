<template>
    <main>
        <div class="main-content">
            <Card class="cardHeader" dis-hover>
                <a><span><Icon type="md-help" />提问</span></a>
                <a><span><Icon type="ios-paper" />回答</span></a>
                <a><span><Icon type="ios-create" />写文章</span></a>
                <a><span><Icon type="logo-javascript" />想法</span></a>
            </Card>
            <Card class="card" v-for="item in this.card" :key="item.title">
                {{item.content}}
            </Card>
        </div>
    </main>
</template>
<script>
export default {
    data(){
        return{
            card:[
                {title:0,content:"asdasd"}
            ],
            id:0,
            content:"1"
        }
    },
    created(){
        for(let i=0;i<=100;i++){
            this.card.push({title:++this.id,content:this.content+1})
        }
    }
}
</script>
<style>
.card{
    margin-bottom: 10px;
    min-height: 266px;
}
.cardHeader{
    font-size: 18px;
    text-align: left;
    margin-bottom: 10px;
}
.cardHeader a{
    text-decoration:none; 
    color: #000;
}
.cardHeader span{
    display: inline-block;
    margin: 0 15px;
}
</style>

