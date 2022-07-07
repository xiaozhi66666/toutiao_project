<template>
  <div>
    <!-- nav标题导航栏S -->
    <van-nav-bar class="van-nav-title" title="登录"
      ><van-icon name="cross" slot="left" @click="$router.back()"
    /></van-nav-bar>
    <!-- nav标题导航栏E -->
    <!-- 登录表单S -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        placeholder="请输入手机号"
        name="mobile"
        class="login-contain"
        v-model="user.mobile"
        ><i
          slot="left-icon"
          class="toutiao toutiao-shouji toutiao"
          clearable
        ></i
      ></van-field>
      <van-field
        type="text"
        name="code"
        placeholder="请输入验证码"
        center
        v-model="user.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isShowTime"
            @finish="finish"
          />
          <van-button
            size="small"
            type="default"
            round
            color="#ededed"
            class="login-yzm"
            native-type="button"
            @click="sendCode"
            v-else
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div class="btn-login">
        <van-button
          block
          type="info"
          native-type="submit"
          class="btn-login-wrap"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- 登录表单E -->
  </div>
</template>

<script>
// 导入登录验证请求
import { login, getCode } from "@/api/user.js";

export default {
  name: "LoginIndex",

  data() {
    return {
      // 定义一个变量对手机号和验证码进行双向绑定，方便获取数据
      user: {
        mobile: "13211112222",
        code: "246810",
        duration: 0,
      },
      isShowTime: false,
    };
  },

  mounted() {},

  methods: {
    async onSubmit() {
      // 表单登录验证规则步骤
      // 1：获取表单输入数据
      const user = this.user;
      // console.log(user);
      // 2：表单验证
      // 在组件中必须通过this.$toast.loading来调用
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁用背景点击
        duration: 0, // 持续时间，默认是2000ms
      });
      // 3：向后台发送登录请求
      try {
        const res = await login(user);
        // console.log("登录成功！", res);
        // 将data解构出来
        const { data } = res;
        this.$store.commit("setUser", data.data);

        // 只要后面再次出现了this.$toast()方法就会覆盖之前的提示
        this.$toast.success("登录成功！");
        this.$router.push("my");
        // window.location.href = "http://localhost:8080/my#/my";
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail("手机号或者验证码错误");
          // console.log("手机号或者验证码错误");
        } else {
          this.$toast.fail("登录失败！登录失败，请稍后重试");

          // console.log("登录失败，请稍后重试@", err);
        }
      }
      // 4：根据请求返回结果进行操作
    },
    async sendCode() {
      // console.log("loginFn");
      // 1:校验手机号
      const ref =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/;
      if (!ref.test(this.user.mobile))
        return this.$toast.fail("手机格式不正确");
      this.isShowTime = true;
      try {
        const res = await getCode(this.user.mobile);
        console.log("登录成功" + res);
      } catch (err) {
        this.$toast.fail("获取验证码失败!");
      }
      // try {
      //   console.log(this.$refs.loginForm.validate("mobile"));
      //   const res = await this.$refs.loginForm.validate("mobile");
      //   console.log(res);
      // } catch (err) {
      //   console.log(err);
      // }
    },
    finish() {
      // 当倒计时结束时触发的函数
      this.isShowTime = false;
    },
  },
};
</script>

<style lang="less" scoped>
// 字体图标样式
.toutiao {
  font-size: 26px;
}
// 验证码按钮样式
.login-yzm {
  width: 130px;
  height: 36px !important;
  line-height: 36px;

  .van-button__text {
    color: #666;
    font-size: 0.275rem;
  } // color
}
// .van-button__text{
// }
// 按钮样式
.btn-login {
  padding: 53px 33px;
  .btn-login-wrap {
    background-color: #6db4fb;
    border: 0;
  }
}
// 输入框的样式
.van-field__control {
  padding-left: 10px !important;
}
</style>