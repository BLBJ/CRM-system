###弹出框使用

组件内部直接引用,使用方法如下：

```vue
<template>
    ...
</template>
export default {
    
    mounted(){
        ...
        this.MessageBox(title,message,type,escape,callback,cancel);
    }
} 

```

+ title：    弹窗头部提示信息
+ message：  弹窗内容
+ type：     类型  暂时有alert、information两种 alert时没有取消按钮
+ escape:    是否以HTML形式显示内容
+ callback： 确认后的回调函数
+ cancel：   取消后的回调函数
