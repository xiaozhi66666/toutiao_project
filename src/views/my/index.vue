<template>
  <div class="my-container">
    <!-- 未登录顶部背景区域S -->
    <div class="header not-login">
      <div class="mobile-btn" @click="$router.push('/login')">
        <img src="~@/assets/images/mobile.png" alt="" class="mobile-img" />
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 未登录顶部背景区域E -->
    <!-- 已登录顶部背景区域S -->
    <div class="header user-info">
      <div class="data-info">
        <div class="left">
          <van-image
            class="user-img"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
            round
          />
          <span class="user-name">黑马杭州前端31期</span>
        </div>
        <div class="right">
          <van-button size="small" round>编辑资料</van-button>
        </div>
      </div>
      <div class="collect-histroy">
        <div class="data-item">
          <span class="count">10</span><span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span><span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span><span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span><span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 已登录顶部背景区域E -->
    <!-- 收藏历史导航区域S -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text">收藏</span>
      </van-grid-item>
    </van-grid>
    <!-- 收藏历史导航区域E -->
  </div>
</template>

<script>
export default {
  name: "MyIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 4.5125rem;
    background: url(~@/assets/images/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .mobile-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 1.65rem;
        height: 1.65rem;
      }
      .text {
        color: #fff;
        margin-top: 0.1875rem;
      }
    }
  }
  .user-info {
    .data-info {
      // width: 100%;
      height: 2.8875rem;
      // background-color: aqua;
      padding: 0.95rem 0.4rem 0.2875rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .user-img {
          width: 1.65rem;
          height: 1.65rem;
          margin-right: 0.2875rem;
          border: 0.0375rem solid #fff;
        }
        .user-name {
          font-size: 0.375rem;
          color: #fff;
        }
      }
    }
    .collect-histroy {
      // width: 100%;
      height: 1.625rem;
      // background-color: yellowgreen;
      display: flex;
      justify-content: space-around;
      .data-item {
        height: 1.625rem;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 0.45rem;
        }
        .text {
          font-size: 0.2875rem;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 1.7625rem;
      i.toutiao {
        font-size: 0.5625rem;
      }
    }
    .toutiao-shoucang {
      color: #eb5353;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 0.35rem;
    }
  }
}
</style>