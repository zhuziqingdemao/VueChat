<template>
    <div class="userinformation">
        <myheader :title="'详细信息'"> 
            <i class="iconfont icon-fanhui1 left" slot="left" @click="goback"></i>
        </myheader>
        <div>
            <ul>
                <li class="userinf-name">
                    <div class="talklist-img">
                        <img :src='avater'/> </div>
                    <span>{{chatWith}}</span>
                </li>
                <li class="userinf-phone">
                    <span class="phone">电话号 :&nbsp</span>
                    <span>13026522068</span>
                </li>
                <li class="userinf-address">
                    <span style="font-weight: bold;">地区 ：&nbsp</span>
                    <span>广东  广州</span>
                </li>
                <li class="userinf-img">
                    <span style="font-weight: bold;">个人相册</span>
                    <span></span>
                </li>
                <li class="userinf-more">
                    <span style="font-weight: bold;">更多</span>
                </li>
                <li class="userinf-send">
                    <div class="send-btn" @click="enterChat(chatWith,chatwithid)">发送消息</div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    import myheader from '../../components/myheader/my-header';
    import scroll from '../../components/scroll/scroll';
    import unlogin from '../../components/unlogin/unlogin';
    import {Toast} from 'mint-ui';
    export default {
        data() {
            return {
                chatWith: this.$route.query.chatwith,
                chatwithid: this.$route.query.chatwithid,
                avater:'',
            }
        },
        components: {
            myheader,
            scroll,
            unlogin
        },
        created() {
            this.getUserInfo();
        },
        methods: {
            ...mapMutations([
                'clear_chatUnread'
            ]),
            goback() {
                this.$router.go(-1);
            },
            getUserInfo() {
                this.axios.get(`/profile/userInfo?name=${this.chatWith}`).then(({data}) => {
                    this.avater = data.avater
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
        },
    }
</script>
<style lang="less" scoped>
    .userinformation{
        position: absolute;
        top: 50px;
        bottom: 60px;
        width: 100%;
        background-color: #ebebeb;
        height: calc(100% - 50px);
    }
    .talklist-img{
        background-color: black;
        min-width: 40px;
        height: 60px;
        width: 60px;
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
    .userinf-name{
        padding: 10px;
        background: #fff;
        margin: 5px 0;
    }
    .userinf-phone{
        width: 100%;
        background-color: #fff;
        font-size: 14px;
        padding: 10px;
        margin: 5px 0;
        .phone{
            font-weight: bold;
        }
    }
    .userinf-address,.userinf-img,.userinf-more{
        font-size: 14px;
        background: #fff;
        border-bottom: 1px solid rgba(153,153,153,0.4);
        padding: 10px 10px;
        font-size: 14px;
    }
    .userinf-send{
        margin-top: 30px;
        .send-btn{
            width: 324px;
            height: 42px;
            text-align: center;
            background-color: #0f710c;
            border: 1px solid #1aad16;
            border-radius: 10px;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            line-height: 42px;
            margin: auto;
            cursor: pointer;
            transition: all 0.5s;
            &:hover{
                background: #1aad16
            }
        }
    }
</style>

