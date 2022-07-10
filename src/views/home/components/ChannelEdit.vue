<template>
  <div class="channel-edit">
    <!-- 我的频道S -->
    <div class="my-channel">
      <van-cell title="我的频道" :border="false"
        ><van-button
          type="danger"
          plain
          round
          size="mini"
          class="my-channel-btn"
          >编辑</van-button
        ></van-cell
      >
      <!-- 编辑频道宫格展示S -->
      <van-grid :gutter="10">
        <van-grid-item
          icon="close"
          v-for="(channel, index) in channelArr"
          :key="index"
          class="van-grid-item"
        >
          <span
            slot="text"
            class="van-grid-itemText"
            :class="{ active: index == activeNum }"
            >{{ channel.name }}</span
          >
        </van-grid-item>
      </van-grid>
      <!-- 编辑频道宫格展示E -->
    </div>
    <!-- 我的频道E -->
    <!-- 我的频道S -->
    <div class="channel-recommend">
      <van-cell title="频道推荐" :border="false"></van-cell>
      <!-- 编辑频道宫格展示S -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="value in 8"
          :key="value"
          text="文字文字"
          icon="plus"
          class="van-grid-item-edit"
        />
      </van-grid>
      <!-- 编辑频道宫格展示E -->
    </div>
    <!-- 我的频道E -->
  </div>
</template>

<script>
// 导入请求所有频道的方法
import { getAllChannel } from "@/api/channel.js";
export default {
  name: "channel",
  props: {
    channelArr: {
      type: Array,
      require: true,
    },
    activeNum: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      allChannel: [],
    };
  },
  async created() {
    try {
      const res = await getAllChannel();
      this.allChannel = res.data.data.channels;
    } catch (error) {
      this.$toast("获取数据失败！");
    }
  },
  computed: {
    recommendChannel() {
      // 定义一个空数组接收差异值
      const recChannel = [];
      // 遍历我的频道的数组

      this.allChannel.forEach((item) => {
        const ret = this.channelArr.find((data) => {
          return data.id == item.id;
        });
        if (!ret) {
          recChannel.push(item);
        }
      });
      return recChannel;
    },
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 1.0625rem 0;
  /deep/.my-channel {
    .van-cell__value {
      display: flex;
      justify-content: right;
      .my-channel-btn {
        width: 1.2875rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.2875rem;
        color: #f85959;
        border: 1px solid #f85a5a;
      }
    }
  }
  .van-cell__title {
    font-size: 0.4rem;
    color: #333;
  }

  /deep/.van-grid-item {
    width: 2rem;
    height: 1.075rem;
    flex-direction: row;

    .van-grid-itemText {
      font-size: 0.35rem;
      color: #222;
      white-space: nowrap;
    }
    .active {
      color: red;
    }
    .van-icon-close {
      position: absolute;
      right: -0.15rem;
      top: -0.15rem;
      font-size: 0.25rem;
    }
  }
  .channel-recommend {
    /deep/.van-grid-item-edit {
      .van-grid-item__content {
        flex-direction: row;
        white-space: nowrap;
        .van-icon-plus {
          font-size: 0.35rem;
          z-index: 2;
        }
        .van-grid-item__text {
          margin: 0;
          padding-left: 0.075rem;
          font-size: 0.35rem;
          color: #222;
        }
      }
    }
  }
}
</style>
  