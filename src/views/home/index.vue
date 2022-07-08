<template>
  <div class="home-container">
    <!-- nav标题导航栏S -->
    <SearchTab></SearchTab>
    <!-- nav标题导航栏E -->
    <!-- Tab标签页S -->
    <van-tabs v-model="active" animated swipeable class="channel-tab">
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
import SearchTab from "@/components/SearchTab.vue";

export default {
  name: "HomeIndex",
  components: { SearchTab },

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

<style  lang="less" scoped>
.home-container {
  // ::v-deep 或者 /deep/  原因是由于我们在作用子组件的样式，如果在一个作用域组件样式当中，默认只会影响作用到组件的根节点上，如果想要作用的更深，要影响到后代元素，必须加上深度操作符号在所需样式前加::v-deep 或者 /deep/或者>>>

  ::v-deep .van-nav-bar__title {
    max-width: unset;
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
  /deep/.channel-tab {
    .van-tabs__wrap {
      height: 1rem;
    }
    .van-tab {
      min-width: 2.5rem;
      border-right: 1px solid #edeff3;
      color: #777;
    }
    .van-tab--active {
      // background-color: #3296fa;
      color: #333;
    }
    .van-tabs__line {
      background-color: #3296fa;
      width: 0.3875rem;
      height: 0.075rem;
      margin-bottom: 0.1125rem;
    }
  }
}
</style>