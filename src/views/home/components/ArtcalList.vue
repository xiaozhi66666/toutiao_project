<template>
  <div class="articalList">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
import { getArticalList } from "@/api/artical.js";
export default {
  name: "ArticalList",
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [], // 保存列表数据的数组
      loading: false,
      finished: false,
    };
  },
  created() {},
  mounted() {},

  methods: {
    async onLoad() {
      // 1异步更新数据
      try {
        const res = await getArticalList({
          channel_id: this.channel.id,
          timestamp: Date.now(),
        });
        const data = res.data.data.results; // 获取到新闻列表数据
        this.list = data;
      } catch (error) {
        console.log("请求失败", err);
      }

      // 2加载状态结束
      //this.loading = false; // 加载第一次请求获取到的数据，加载完成后自动认定加载以完成，必须设置为false才能让其继续进行加载直至铺满页面
      // 数据全部加载完成
      // 3finished  判定是否已全部加载完成，如果已经符合加载完成的条件，让其设置为true就会显示已加载完成
    },
  },
};
</script>

<style lang="less" scoped>
</style>