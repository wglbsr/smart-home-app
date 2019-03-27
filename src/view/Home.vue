<template>
    <view-box ref="viewBox" style="position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px">
        <x-header slot="header" class="common-header"
                  :right-options="{showMore: true}"
                  :left-options="{showBack:$route.name != 'Index'}"
                  @on-click-more="showConditionDialog"
        >
            {{$route.meta.title}}
        </x-header>
        <router-view class="main-div"
                     style="position:fixed;top:40px;bottom:50px;min-height: 500px;overflow-y: scroll;">
        </router-view>
        <tabbar class="footer-tab-bar" @on-index-change="selectItem">
            <tabbar-item selected>
                <img slot="icon" src="http://www.dy-iot.net/home.png">
                <span slot="label">主页</span>
            </tabbar-item>
            <tabbar-item show-dot>
                <img slot="icon" src="http://www.dy-iot.net/dev.png">
                <span slot="label">产品</span>
            </tabbar-item>
            <tabbar-item>
                <img slot="icon" src="http://www.dy-iot.net/dev.png">
                <span slot="label">待定</span>
            </tabbar-item>
            <tabbar-item badge="2">
                <img slot="icon" src="http://www.dy-iot.net/user-pic.png">
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </view-box>
</template>
<script>
    import CIndex from '../components/Index.vue'
    import { XButton } from 'vux'
    export default {
        name: "Home",
        components: {
            CIndex,
            XButton
        },
        data() {
            return {
                routesList: [
                    {path: '/Index'},
                    {path: '/Index'},
                    {path: '/Index'},
                    {path: '/Index'},
                ],

            }
        },
        mounted: function () {
            this.$router.replace({path: '/Index'});
        },
        methods: {
            selectItem: function (index) {
                this.$router.replace(this.routesList[index]);
            },

        },

    }
</script>

<style scoped>
    html, body {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }

    .common-header {
        width: 100%;
        position: absolute;
        top: 0;
    }

    .footer-tab-bar {
        width: 100%;
        bottom: 0px;
        position: fixed;
        height: 50px;
    }

    .common-header, .footer-tab-bar {
        z-index: 999;
    }

</style>
