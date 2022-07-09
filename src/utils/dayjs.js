//引入dayjs组件
import dayjs from "dayjs";
// 引入vue实例
import Vue from "vue";

dayjs.extend(relativeTime);
// dayjs默认英文   == >  设置成中文
import relativeTime from "dayjs/plugin/relativeTime";
// var relativeTime = require('dayjs/plugin/relativeTime')
import "dayjs/locale/zh-cn"; // ES 2015
dayjs.locale("zh-cn"); //全局配置中文显示模式
// 直接调用方法即可
// console.log(dayjs().format());
// console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
// 注册一个全局过滤器，因为页面上有很多用到的地方

Vue.filter("relativeTime", (val) => {
    return dayjs().to(dayjs(val));
});

// console.log(dayjs().from(dayjs("2021")));
console.log(dayjs().from(dayjs("2021"))); //2年前
console.log(dayjs().to(dayjs("2021"))); // 2年内
// console.log(dayjs().fromNow(dayjs("2021"))); // 2 years ago // 2 years
// console.log(dayjs().toNow(dayjs("2021"))); // 2 years ago // 2 years
// console.log(dayjs().from(dayjs(), true));