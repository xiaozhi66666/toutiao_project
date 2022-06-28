<template>
  <div>
    <!-- nav标题导航栏S -->
    <van-nav-bar title="登录" />
    <!-- nav标题导航栏E -->
    <!-- 登录表单S -->
    <van-form @submit="onSubmit">
      <van-field name="" placeholder="请输入手机号" />
      <van-field type="password" name="密码" placeholder="请输入密码密码" />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
    <!-- 登录表单E -->
  </div>
</template>

<script>
export default {
  name: "LoginIndex",

  data() {
    return {};
  },

  mounted() {},

  methods: {
    onSubmit() {},
  },
};
</script>

<style lang="scss" scoped>
</style>