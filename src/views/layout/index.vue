<template>
  <div class="layout-contanier">
    <!-- 子路由出口S -->
    <router-view></router-view>
    <!-- 子路由出口E -->
    <!-- 底部tab栏S -->
    <van-tabbar v-model="active" class="tabbar-item">
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <!-- 可以通过$store.state.容器名 访问到vuex中的容器变量 -->
        <!-- 也可以通过 import {mapState} from vuex ==> 计算属性中 computed:{ ... mapState(['vuex中的容器名'])} 进行取出-->
        <span class="text">{{ $store.state.user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- 底部tab栏E -->
  </div>
</template>

<script>
export default {
  name: "layoutIndex",

  data() {
    return { active: 0 };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.tabbar-item {
  i.toutiao {
    font-size: 28px;
  }
  span.text {
    font-size: 0.32rem;
  }
}
</style>