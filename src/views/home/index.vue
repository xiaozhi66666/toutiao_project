<template>
  <div class="home-container">
    <!-- nav标题栏S -->
    <SearchTab></SearchTab>
    <!-- nav标题导E -->
    <!-- Tab导航栏S -->
    <van-tabs v-model="active" animated swipeable class="channel-tab">
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <ArticalList :channel="item"></ArticalList>
      </van-tab>
      <!--为了避免最后一项标签拉不出来，最右侧设置一个空盒子进行占位 -->
      <div class="placehoder" slot="nav-right"></div>
      <!-- 使用vant  Tab标签中的slot=nav-right定位到最右侧 -->
      <div slot="nav-right" class="hamburger-nav" @click="editIsShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- Tab导航栏E -->
    <!-- 频道弹出层S -->
    <van-popup
      v-model="editIsShow"
      closeable
      round
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 显示弹出层内容组件 -->
      <ChannelEdit
        :channelArr="channels"
        :activeNum="active"
        @changeActive="changeActiveFn"
      ></ChannelEdit>
    </van-popup>
    <!-- 频道弹出层E -->
  </div>
</template>

<script>
import SearchTab from "@/components/SearchTab.vue";
// 导入articallist组件
import ArticalList from "@/views/home/components/ArtcalList.vue";
// 导入封装好的获取用户频道的请求
import { getChannels } from "@/api/user";
// 引入弹出层内容组件
import ChannelEdit from "@/views/home/components/ChannelEdit";
// 引入vuex中的mapstate/然后在计算属性中...mapState['user']
import { mapState } from "vuex";
// 引入取出本地存储数据的方法
import { getItem } from "@/utils/storage.js";

export default {
  name: "HomeIndex",
  components: { SearchTab, ArticalList, ChannelEdit },

  data() {
    return {
      // 通过名称匹配在标签指定 name 属性的情况下，v-model 的值为当前标签的 name（此时无法通过索引值来匹配标签）。
      active: 0,
      channels: [], // 用户频道列表
      editIsShow: false, // 用来控制是否展示弹出层组件
    };
  },
  computed: {
    ...mapState(["user"]), // 获取到用户的登录状态
  },
  created() {
    this.loadChannels();
  },
  mounted() {},

  methods: {
    async loadChannels() {
      if (this.user) {
        // 登录状态,直接从后台拿取数据
        try {
          const res = await getChannels();
          this.channels = res.data.data.channels;
        } catch (error) {
          this.$toast("获取失败！");
        }
      } else {
        // 未登录状态,从本地拿取数据
        // 但是如果本地存储没有数据就重新发起一次获取所有频道的请求
        if (getItem("TOKEN_CHANNEL")) {
          this.channels = getItem("TOKEN_CHANNEL");
        } else {
          try {
            const res = await getChannels();
            this.channels = res.data.data.channels;
          } catch (error) {
            this.$toast("获取失败！");
          }
        }
      }
    },
    changeActiveFn(index, editIsShow = true) {
      // console.log("Home", index);
      this.active = index;
      this.editIsShow = editIsShow;
    },
  },
};
</script>

<style  lang="less" scoped>
.home-container {
  padding-top: 2.15rem;
  // ::v-deep 或者 /deep/  原因是由于我们在作用子组件的样式，如果在一个作用域组件样式当中，默认只会影响作用到组件的根节点上，如果想要作用的更深，要影响到后代元素，必须加上深度操作符号在所需样式前加::v-deep 或者 /deep/或者>>>
  // 给底部固定定位导航栏设置一个padding-bottom
  padding-bottom: 1.25rem; // 由于元素审查时候的单位是实际测量单位的1/2，所以50*2=100
  /deep/ .van-nav-bar__title {
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
      position: fixed;
      top: 1.15rem;
      // 定位以后。内容将不会被撑开，必须设置left:0 & right:0
      left: 0;
      right: 0;
      z-index: 1;
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
  .hamburger-nav {
    position: absolute; // 绝对定位到右边
    position: fixed; //固定在此处
    right: 0;
    width: 0.825rem;
    height: 1.025rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.9;
    i.toutiao-gengduo {
      font-size: 0.5rem;
    }
    &:before {
      // &找其父级元素
      content: ""; //使用伪类元素时候必须加上content:''，否则内容不会显示
      width: 0.025rem;
      height: 1.025rem;
      position: absolute;
      left: 0; // 定位到最左侧
      background: url(~@/assets/images/gradient-gray-line.png);
      background-size: contain;
    }
  }
  .placehoder {
    // 因为在组组件中将每一项标签都进行了flex布局，并且每个均分了宽度flex-basis:22% ===> 必须清除掉该样式才能生效，否则设置不了宽度,设置flex-shrink(定义项目的缩小比例)=0即可清除
    width: 0.4125rem;
    height: 0.5125rem;
    flex-shrink: 0;
  }
}
</style>