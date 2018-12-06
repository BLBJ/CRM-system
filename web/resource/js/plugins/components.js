/**
 * @author wbding
 * @date 2018/10/30.
 * @description
 */


//插件都可以在这里加载

import MessageBox from './message-box/index.js';
let install = (Vue)=>{
    Vue.component(MessageBox.name,MessageBox);
    Vue.prototype.MessageBox = MessageBox.installMessage;
};

export default install;
