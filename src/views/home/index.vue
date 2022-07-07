<template>
  <div class="home-container">
    <!-- nav标题导航栏S -->
    <van-nav-bar class="page-nav-bar">
      <van-button
        slot="title"
        size="small"
        round
        icon="search"
        type="info"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- nav标题导航栏E -->
    <!-- Tab标签页S -->
    <van-tabs v-model="active" animated swipeable>
      <van-tab title="标签 1">内容 1</van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 5">内容 5</van-tab>
      <van-tab title="标签 6">内容 6</van-tab>
    </van-tabs>
    <!-- Tab标签页E -->
  </div>
</template>

<script>
export default {
  name: "HomeIndex",

  data() {
    return {
      // 通过名称匹配在标签指定 name 属性的情况下，v-model 的值为当前标签的 name（此时无法通过索引值来匹配标签）。
      active: 0,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style  lang="less" >
.home-container {
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 6.9375rem;
    height: 0.8rem;
    background-color: #5babfb;
    border: none;
    font-size: 0.35rem;
    .van-icon {
      color: #fff;
      font-size: 0.4rem;
    }
  }
}
</style>