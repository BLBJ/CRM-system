/**
 * @author wbding
 * @date 2018/10/30.
 * @description
 */
import Vue from 'vue'
import MessageBox from './main.vue';
let noop = () => {};

MessageBox.installMessage =
    function (title = "", message = "", type = 'information', escape = false, callback = noop, cancel = noop) {
        if (typeof callback != "undefined" && Object.prototype.toString.call(callback) !== "[object Function]") {
            throw "回调函数类型不是一个Function!";
        }
        if (typeof cancel != "undefined" && Object.prototype.toString.call(cancel) !== "[object Function]") {
            throw "回调函数类型不是一个Function!";
        }
        let messagebox = Vue.extend(MessageBox);

        let component = new messagebox({
            data: {title, message, type, escape, callback, cancel}
        }).$mount();
        document.querySelector('body').appendChild(component.$el);

        return component;
    };

export default MessageBox;