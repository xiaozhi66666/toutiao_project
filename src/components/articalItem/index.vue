<template>
  <div>
    <!-- <div class="article-item">文章列表项</div> -->
    <van-cell class="article-item">
      <div slot="title" class="title">{{ article.title }}</div>
      <div slot="label">
        <div class="article-item-info">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate }}</span>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticalItem",
  props: {
    article: {
      type: Object, //
      require: true,
    },
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.article-item-info {
  span {
    color: #ccc;
    margin-right: 0.5rem;
  }
}
</style>