<template>
    <div>
        <myheader :title="'关注列表'"></myheader>
        <div class='talkList'>
            <div  v-show="userInfo._id" style='height:100%'>
                <scroll @change="showupload=true" :stop="55" :threshold="70" ref="scroll" class="scroll-wrap pyq-card" :data="talkList">
                    <ul>
                        <li class="pyq">
                            <div class='talklist-item' @click="enterChat('robot','1234')">
                                <div class='talklist-img'>
                                    <img :src='img'>
                                </div>
                                <span class='tasllist-name'>我是机器人</span>
                                <span class='click-send'>我是无所不知的机器人</span>
                            </div>
                        </li>
                        <li class="pyq" :key="Math.random()" v-for="(list,index) in talkList">
                            <div class='talklist-item' @click="getUserInfo(list.username,list._id)">
                                <div class='talklist-img'>
                                    <img :src='list.avater'/>
                                </div>
                                <span class='tasllist-name'>{{list.username}}</span>
                                <span class='click-send'>点击发送消息</span>
                            </div>
                        </li>
                    </ul>
                </scroll>
            </div>
            <unlogin v-show="!userInfo._id"></unlogin>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    import myheader from '../../components/myheader/my-header';
    import scroll from '../../components/scroll/scroll';
    import unlogin from '../../components/unlogin/unlogin';
    import talkList from './talkList';
    export default {
    created() {
        this.getFridens()
    },
    components: {
      myheader,
      scroll,
      unlogin
    },
    computed: {
      ...mapState([
        'userInfo'
      ]),
    },
    data(){
        return{
            talkList:[],
            id: this.$route.query.id || '',
            name: this.$route.query.name || '',
            img:require('../../common/image/logo.png')
        }   
    },
    methods: {
       ...mapMutations([
        'clear_chatUnread'
      ]),
       getFridens(){
           this.axios.post('/follower/getfolllist',{
                username:this.userInfo.username
            }).then((res) => {
                let data = [];
                data.push(res.data)
                data.forEach((item,index)=>{
                    let username = item.username
                    this.axios.get(`/profile/userInfo?name=${item.followername}`).then((da) => {
                    this.talkList.push(da.data)
                })
                })
            })
        },
        enterChat(chatwith, chatwithid) {
            this.clear_chatUnread(chatwith);
            this.$router.push({path: '/chat', query: {chatwith, chatwithid}});
            this.axios.post('/chat/clearchatunread', {
                from: this.userInfo._id,
                to: chatwithid
            })
        },
        getUserInfo(chatwith, chatwithid){
           this.$router.push({path:'/userInfo',query:{chatwith, chatwithid}})
        } ,
        // enterJiQichat(){
        //     this.axios.get('/chat/tulingapi',{
        //         'key':'9857cf36b0bc4a48b8ba3f976e43a4cf',
        //         'userid':'1234',
        //         'info':document.getElementById('robot').value}
        //     })
        // },
        goDialog:function(chatwith,chatwithid){
            this.$router.push({path: '/chat', query: {chatwith, chatwithid}});
        },
    
    }
}
</script>
<style lang="less" scoped>
    .talkList{
        position: absolute;
        top: 50px;
        bottom: 60px;
        width: 100%;
        background-color: #fcfcfc;
        ul{
            height:100;
        }
        .talklist-item{
            background: #fff;
            font-family: 'Microsoft Yahei';
            padding: 10px;
            position: relative;
            align-items: center;
            &::after{
                content: '';
                border-bottom: 1px solid #dcdddd;
                color: #dcdddd;
                opacity: .56;
                height: 1px;
                width: 100%;
                position: absolute;
                bottom: 0;
                left:0;
                transform: scaleY(.5);
                -webkit-transform: scaleY(.5);
                transform-origin: 0 100%;
            }
            .talklist-img{
                background-color: black;
                min-width: 40px;
                height: 40px;
                width: 40px;
                border-radius: 50%;
                margin-right: 10px;
                overflow: hidden;
                display:inline-block;
                img{
                    width: 100%;
                    display: block;
                    position: relative;
                    top: 50%;
                    -webkit-transform: translateY(-50%);
                    transform: translateY(-50%);
                }
            }
            .tasllist-name{
                position: relative;
                top: -25px;
                font-size: 14px;
                color: #333;
            }
        }
        .click-send{
            position: absolute;
            left: 65px;
            font-size: 14px;
            color: rgba(153, 153, 153, 0.8);
            top: 35px;
        }
    }
</style>