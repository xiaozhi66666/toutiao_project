<template>
  <div class="articalList">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshText"
    >
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="加载失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticalItem
          v-for="(artical, index) in list"
          :key="index"
          :article="artical"
        >
        </ArticalItem>

        <!-- <van-cell
          v-for="(artical, index) in list"
          :key="index"
          :title="artical.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 为了让用户在切换导航栏时之前浏览的记录停留在切换前的位置，给最外侧盒子定一个height100%，overhidde-y:auto,在组件的最外面包裹一个盒子，将里面的内容封装成一个独立的区域，每个组件就会有不同的滚动区域(之前都是在同一个body中滚动，所以会互相影响)，这样就不会影响到其他组件了
import { getArticalList } from "@/api/artical.js";
import ArticalItem from "@/components/articalItem/index.vue";
export default {
  name: "ArticalList",
  components: {
    ArticalItem,
  },
  props: {
    channel: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      list: [], // 保存列表数据的数组
      loading: false, // 表示是否加载下一页
      finished: false, // 表示展示数据是否已全部加载完成
      timestamp: null, //请求获取下一页的时间戳
      error: false, //若列表数据加载失败，将 error 设置成 true 即可显示错误提示，用户点击错误提示后会重新触发 load 事件。
      refreshing: false, //控制下拉刷新的loading状态
      refreshText: "刷新成功",
    };
  },
  created() {},
  mounted() {},

  methods: {
    async onLoad() {
      // 1异步更新数据
      // if (this.refreshing) {
      //   this.list = [];
      //   this.refreshing = false;
      // }
      try {
        const { data } = await getArticalList({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(), //时间戳，请求新的推荐数据传入当前的时间戳
          // 如果
        });
        // if (Math.random() > 0.5) {  测试出现加载错误的情况，
        const { results } = data.data; // 获取到新闻列表数据
        // console.log(results);
        // 数组展开运算符...会将数组元素一个一个拿出来
        this.list.push(...results);
        // 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false;
        // 判断数据是否已全部加载完成
        if (results.length) {
          // 如果下一个数据数组还存在的话，更新获取下一页数据的时间戳存入自定义变量timestamp
          this.timestamp = data.data.pre_timestamp;
        } else {
          // 如果新数据不存在就将其控制加载完毕的的状态调整为true
          this.finished = true;
        }
      } catch (error) {
        console.log("请求失败", error);
        this.loading = false; //加载状态设置为false
        this.error = true; // 将提示加载失败的开关开启，提示加载失败，并且可以让用户自行点击重新出发onLoad事件
      }

      // 2加载状态结束
      //this.loading = false; // 加载第一次请求获取到的数据，加载完成后自动认定加载以完成，必须设置为false才能让其继续进行加载直至铺满页面
      // 数据全部加载完成
      // 3finished  判定是否已全部加载完成，如果已经符合加载完成的条件，让其设置为true就会显示已加载完成
    },
    async onRefresh() {
      try {
        // 请求获取数据
        const res = await getArticalList({
          channel_id: this.channel.id,
          timestamp: Date.now(), //下拉刷新，获取最新的时间戳，每次获取最新的数据
          // 如果
        });
        // 将数据追加到列表的顶部
        const { results } = res.data.data; // 获取到新闻列表数据
        this.list.unshift(...results); // 将获取到的最新数据利用数组的unshift方法添加到数组头部
        this.refreshText = `刷新成功，共加载${results.length}条数据`;
        // 数组展开运算符...会将数组元素一个一个拿出来
        // 关闭下拉刷新的loading状态
        this.refreshing = false;
      } catch (error) {}
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
  },
};
</script>

<style lang="less" scoped>
.articalList {
  height: 79vh;
  overflow-y: auto;
}
</style>