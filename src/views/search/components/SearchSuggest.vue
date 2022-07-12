<template>
  <div class="SearchSuggest">
    <van-cell
      :title="item || '内容为空'"
      icon="search"
      v-for="(item, index) in suggestionList"
      :key="index"
    >
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggest",
  props: {
    searchVal: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      suggestionList: [],
      timer: null,
    };
  },

  mounted() {},
  watch: {
    searchVal: {
      // 第一种方法自定义一个防抖函数
      // handler(newVal, oldVal) {
      //   if (this.timer) {
      //     // 定义一个定时器进行防抖
      //     clearTimeout(this.timer);
      //   }
      //   this.timer = setTimeout(() => {
      //     this.getSearchSuggestList(newVal);
      //   }, 1000);
      // },
      // immediate: true,
      // 第二种方法引入第三方包，利用其中的防抖工具进行防抖，传入对应的执行函数以及相隔的时间即可(ms)
      handler: debounce(function (newVal) {
        console.log(newVal);
      }, 2000),
      immediate: true,
    },
  },
  methods: {
    async getSearchSuggestList(val) {
      try {
        const res = await getSearchSuggestion(val);
        this.suggestionList = res.data.data.options;
      } catch (error) {
        this.$toast("获取失败！");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>