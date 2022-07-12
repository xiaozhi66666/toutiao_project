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
          ref="btn"
          @click="isEdit = !isEdit"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        ></van-cell
      >
      <!-- 编辑频道宫格展示S -->
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(channel, index) in channelArr"
          :key="channel.id"
          class="van-grid-item"
          @click="changeShow(channel, index)"
        >
          <van-icon
            slot="icon"
            name="close"
            v-show="isEdit && !fixedChannel.includes(channel.id)"
          ></van-icon>
          <!-- 在添加是否显示移除图标的条件基础上增加一个判断，判断维护的数组中有没有与其对应id相等的，将没有的添加 -->
          <span
            slot="text"
            class="van-grid-itemText"
            :class="{ active: index == activeNum }"
            >{{ channel.name }}
          </span>
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
          @click="addToMy(item)"
          v-for="item in recommendChannel"
          :key="item.id"
          :text="item.name"
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
// 导入请求所有频道的方法// 引入设置用户频道的方法
import {
  getAllChannel,
  addUserChannel,
  delUserChannel,
} from "@/api/channel.js";
// 导入存入本地的方法
import { setItem } from "@/utils/storage";
// 引入vuex中的mapstate/然后在计算属性中...mapState['user']
import { mapState } from "vuex";
export default {
  name: "ChannelEdit",
  props: {
    //我的频道数据
    channelArr: {
      type: Array,
      require: true,
    },
    // 保存首页面高亮项传来的索引
    activeNum: {
      type: Number,
      require: true,
    },
  },

  data() {
    return {
      allChannel: [], // 定义一个数组接收请求传来的所有推荐频道
      isEdit: false, // 维护一个变量判断是否显示移除图标以及编辑/完成的切换
      fixedChannel: [0], // 维护一个数组用来存放其频道不可以显示移除图标的项的id
    };
  },
  async created() {
    // 初始化页面获取所有的频道数据
    try {
      const res = await getAllChannel();
      this.allChannel = res.data.data.channels;
    } catch (error) {
      this.$toast("获取数据失败！");
    }
  },
  computed: {
    ...mapState(["user"]), // 在计算属性中将保存在vuex中的user解构出来,方便判断是否已登录
    recommendChannel() {
      // 两种方法
      // 用所有频道过滤，判断条件是用推荐频道进行你find方法查找有咩有id相同的，进行取反即可表示id不相等的情况
      // 注意，整个find在每次遍历的时候都是一个表达式，返回一个boolean值，通过这个值来判断是否满足filter条件
      // 数组.filter方法是会在内部将符合条件的元素添加至一个新数组
      return this.allChannel.filter((item) => {
        return !this.channelArr.find((data) => {
          return data.id == item.id;
        });
      });
      // 定义一个空数组接收差异值
      // const recChannel = [];
      // // 遍历我的频道的数组
      // this.allChannel.forEach((item) => {
      // ret 接收find方法表达式的返回值，会返回true/false
      //   const ret = this.channelArr.find((data) => {
      //     return data.id == item.id;
      //   });
      // 取反表示如果所有频道中不包括推荐频道列表，就push
      //   if (!ret) {
      //     recChannel.push(item);
      //   }
      // });
      // return recChannel;
    },
  },
  mounted() {},

  methods: {
    // 频道推荐添加到我的频道
    async addToMy(item) {
      // 将点击到的推荐项push到我的频道当中
      this.channelArr.push(item);
      // 数据持久化处理
      // 这里需要添加判断 1：用户未登录状态 2：已登录状态 （通过判断vuex中保存的user信息是否存在来判断）
      this.addUserChannelFn(item);
    },
    //根据按钮是否处于编辑状态进行删除的操作
    changeShow(channel, index) {
      if (this.isEdit) {
        // 处于编辑状态，执行删除功能
        // 添加判断，如果是规定好的不可以删除的就不要给其绑定点击事件，阻止掉
        if (this.fixedChannel.includes(channel.id)) {
          return;
        }
        if (index <= this.activeNum) {
          //如果当前选中的项索引值<=首页面高亮项传来的索引，那么久让激活频道的索引 -1
          this.$emit("changeActive", this.activeNum - 1);
        }
        // 否则正常进行数组的删除
        // 参数1：要删除的元素的开始索引(包括)
        // 参数2：删除的个数
        this.channelArr.splice(index, 1);
        // 调用删除指定id频道的方法,传入id
        this.delUserChannelFn(channel.id);
      } else {
        // 处于完成状态，点击跳转功能
        this.$emit("changeActive", index, false);
        // console.log(channel, index);
      }
    },
    // 将新增用户指定频道请求封装成一个方法
    async addUserChannelFn(item) {
      try {
        if (this.user) {
          await addUserChannel({
            id: item.id,
            seq: this.channelArr.length,
          });
        } else {
          // 未登录就存入本地
          setItem("TOKEN_CHANNEL", this.channelArr);
        }
      } catch (error) {
        this.$toast("添加频道失败！");
      }
    },
    // 将删除用户指定频道请求封装成一个方法
    async delUserChannelFn(channelId) {
      try {
        if (this.user) {
          await delUserChannel(channelId);
        } else {
          // 未登录就存入本地
          setItem("TOKEN_CHANNEL", this.channelArr);
        }
      } catch (error) {
        this.$toast("删除频道失败！");
      }
    },
  },
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
    .van-grid-item__icon-wrapper {
      position: unset;
    }
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
  