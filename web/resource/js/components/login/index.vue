<template>
    <div class="animate form login_form">
        <section class="login_content">
            <form>
                <h1>用户登录</h1>
                <div>
                    <input type="text" name="username" class="form-control" v-model="username" placeholder="用户名"/>
                </div>
                <div>
                    <input type="password" name="password" class="form-control" v-model="password" placeholder="密码"/>
                </div>
                <div>
                    <input  type="button" class="btn btn-default submit btn-primary" id="loginSubmit" v-on:click="submitLogin" value="登录">
                </div>
                <div class="clearfix"></div>

                <div class="separator">
                    <p class="change_link">首次访问?
                        <a href="#signup" class="to_register"> 创建账户 </a>
                    </p>
                    <div class="clearfix"></div>
                    <br/>
                </div>
            </form>
        </section>
    </div>
</template>
<style>
    #code{
        width: 59%;
        display: inline;
    }
    #sendCode{
        display: inline;
        width: 38%;
    }
    #loginSubmit{
        width: 36%;
    }

</style>
<script>
    let Crypto = require('crypto');
    let md5Sign = function (data) {
        let md5 = Crypto.createHash('md5').update(data).digest('hex');
        return md5;
    };
    const loginReg = {
        "username": [
            {
                reg: '^$',
                match: true,
                message: "用户名不能为空"
            },
            {
                reg: '^[a-zA-Z][a-zA-Z0-9]{3,15}$',
                match: false,
                message: "用户名由英文字母和数字组成的4-16位字符，以字母开头"
            }
        ],
        "password": [
            {
                reg: '^$',
                match: true,
                message: "密码不能为空"
            },
            {
                reg: '^[0-9A-Za-z]{6,18}$',
                match: false,
                message: "密码由英文字母或数字组成的6-18位字符"
            }
        ]
    };
    export default {
        data() {
            return {
                username: "",
                password: "",
            };
        },
        mounted() {


        },
        methods: {
            submitLogin: function () {
                let self = this;
                let param = {
                    username: this.username,
                    password: this.password,
                };
                //循环验证input
                let flag = Object.keys(param).some(key => {
                    let value = param[key];
                    return loginReg[key].some(rule => {
                        if (new RegExp(rule.reg).test(value) === rule.match) {
                            this.MessageBox('提示', rule.message, "alert", false);
                            return true;
                        }
                    });
                });
                if (flag === true) {
                    return false;
                }
                else {
                    param.password = md5Sign(param.password);
                    self.$api.login(JSON.stringify(param))
                        .then((result) => {
                            if (result.code === "200") {
                                location.href = '/';
                            } else {
                                self.MessageBox('提示', result.msg, 'alert', false);
                            }

                        }).catch(err => {
                        self.MessageBox('错误', err, 'alert', false);
                    });
                    return false;
                }
            }
        }
    }
</script>