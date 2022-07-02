/* 
封装本地存储模块
*/
/* 
1：设置值存入本地存储
2：取值
3：移除值
*/

export const setItem = (key, value) => {
    if (typeof value == "object") {
        // 将数组或者对象类型的数据转换成字符串存入
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};

// 2:取值
export const getItem = (key) => {
    const data = window.localStorage.getItem(key);
    try {
        return JSON.parse(data); // 如果返回的是json字符串就将其转换为对象形式赋值回去
    } catch (error) {
        return data; // 否则原路返回
    }
};

// 3：移除值
export const removeItem = (key) => {
    window.localStorage.removeItem(key);
};