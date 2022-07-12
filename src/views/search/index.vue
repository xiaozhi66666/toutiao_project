<template>
  <div class="search-container">
    <!-- action=""  ==>  action不为空就会在手机上显示一个回车按键 -->
    <form action="/">
      <van-search
        v-model="searchVal"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="#3296fa"
        shape="round"
        class="search-input"
        @focus="focusFn"
      />
    </form>
    <div class="search-show">
      <SearchResule v-if="isShow"></SearchResule>
      <!-- 用输入框绑定的v-model值来判断是否展示搜索建议列表 -->
      <SearchSuggest
        v-else-if="searchVal"
        :searchVal="searchVal"
      ></SearchSuggest>
      <!--上述两个条件均不满足即展示搜索历史 -->
      <SearchHistroy v-else></SearchHistroy>
    </div>
    <!--   ==>   封装成三个组件展示在该页面,便于阅读,易于维护
1:搜索历史记录
2:搜索联想建议
3:搜索结果 -->
  </div>
</template>

<script>
// 引入封装好的三个组件1:搜索历史记录2:搜索联想建议3:搜索结果
import SearchHistroy from "@/views/search/components/SearchHistroy";
import SearchResule from "@/views/search/components/SearchResule";
import SearchSuggest from "@/views/search/components/SearchSuggest";
export default {
  name: "SearchIndex",
  components: {
    SearchHistroy,
    SearchResule,
    SearchSuggest,
  },

  data() {
    return {
      searchVal: "",
      isShow: false, // 控制是否显示搜索记录
    };
  },

  mounted() {},

  methods: {
    onSearch(val) {
      this.isShow = true;
    },
    onCancel() {
      //点击取消后的逻辑写在这里  ==> 取消方法
      this.$router.back();
    },
    focusFn() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container {
  .search-input {
    padding-left: 0.4rem;
    .van-search__action {
      color: #fff;
      margin-left: 0.4125rem;
      margin-right: 0.4625rem;
    }
  }
}
</style>