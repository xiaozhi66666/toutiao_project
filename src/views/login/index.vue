<template>
  <div>
    <!-- nav标题导航栏S -->
    <van-nav-bar class="van-nav-title" title="登录" />
    <!-- nav标题导航栏E -->
    <!-- 登录表单S -->
    <van-form @submit="onSubmit">
      <van-field
        placeholder="请输入手机号"
        name="手机号"
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
        name="验证码"
        placeholder="请输入验证码"
        center
        v-model="user.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-button
            size="small"
            type="default"
            round
            color="#ededed"
            class="login-yzm"
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
import { login } from "@/api/user.js";
export default {
  name: "LoginIndex",

  data() {
    return {
      // 定义一个变量对手机号和验证码进行双向绑定，方便获取数据
      user: {
        mobile: "13213454567",
        code: "246810",
        duration: 0,
      },
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
        console.log("登录成功！", res);
        // 只要后面再次出现了this.$toast()方法就会覆盖之前的提示
        this.$toast.success("登录成功！");
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
  },
};
</script>

<style lang="scss" scoped>
</style>