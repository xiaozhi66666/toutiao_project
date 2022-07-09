<template>
  <div>
    <!-- <div class="article-item">文章列表项</div> -->
    <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}
      </div>
      <van-image
        fit="cover"
        class="article-item-img"
        :src="article.cover.images[0]"
        v-if="article.cover.type == 1"
      />
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type == 3">
          <div
            class="cover-item"
            v-for="(item, index) in article.cover.images"
            :key="index"
          >
            <van-image fit="cover" :src="item" class="cover-item-img" />
          </div>
        </div>
        <div class="article-item-info">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <!-- 使用全局定义好的时间格式过滤器将时间按照自己想要的方式进行过滤输出 -->
          <span>{{ article.pubdate | relativeTime }}</span>
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

<style lang="less" scope d>
.article-item {
  .title {
    font-size: 0.4rem;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset; // unset取消设置值
    .article-item-img {
      width: 2.9rem;
      height: 1.825rem;
      padding-left: 0.3125rem;
    }
  }
  .cover-wrap {
    display: flex;

    .cover-item {
      flex: 1;
      height: 1.825rem;
      padding: 0.375rem 0;
      &:not(:last-child) {
        //&选取父级元素  :not(:last-child)  ==> 选中排除最后一个元素在外的所有元素
        padding-right: 0.05rem;
      }
      .cover-item-img {
        width: 100%;
        height: 1.825rem;
      }
    }
  }
  .article-item-info {
    span {
      font-size: 0.2875rem;
      margin-right: 0.3125rem;
      color: #b4b4b4;
    }
  }
}
</style>