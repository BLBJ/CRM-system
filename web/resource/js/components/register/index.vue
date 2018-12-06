<template>
    <div class="animate form registration_form">
    <section class="login_content">
        <form>
            <h1>用户注册</h1>
            <div>
                <input type="text" name="username" class="form-control" v-model="username" placeholder="用户名"/>
            </div>
            <div>
                <input type="password" name="password" class="form-control" v-model="password" placeholder="密码"/>
            </div>
            <!--<div>-->
                <!--<input type="text" class="form-control" placeholder="手机" v-model="phone"/>-->
            <!--</div>-->
            <div>
                <input type="email" class="form-control" placeholder="邮箱" v-model="email" required="required"/>
            </div>
            <div>
                <input class="btn btn-default submit btn-primary" type="button"  id="registerSubmit"  value="提交" v-on:click="submitForm"/>
            </div>

            <div class="clearfix"></div>

            <div class="separator">
                <p class="change_link">已有账号 ?
                    <a href="#signin" class="to_register"> 登录 </a>
                </p>

                <div class="clearfix"></div>
                <br/>
            </div>
        </form>
    </section>
    </div>
</template>
<style>
    #registerSubmit{
        width: 36%;
    }
</style>

<script>
    let Crypto = require('crypto');
    let md5Sign = function (data) {
        let md5 = Crypto.createHash('md5').update(data).digest('hex');
        return md5;
    };

    const registerReg = {
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
        ],
        "email": [
            {
                reg: '^$',
                match: true,
                message: "邮箱不能为空"
            }, {
                reg: '^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$',
                match: false,
                message: "请输入正确邮箱"
            }
        ]
    };
    export default {
        data() {
            return {
                username: "",
                password: "",
                email: ""
            };
        },
        mounted() {
            let self = this;
        },
        methods: {
            submitForm: function () {
                let param = {
                    username: this.username,
                    password:this.password,
                    email: this.email
                };

                //循环验证input
                let flag = Object.keys(param).some(key => {
                    let value = param[key];
                    return registerReg[key].some(rule => {
                        if (new RegExp(rule.reg).test(value) === rule.match) {
                            this.MessageBox('提示', rule.message, "alert", false);
                            return true;
                        }
                    });
                });
                if (flag === true) {
                    return false;
                }else {
                    param.password =  md5Sign(this.password);
                    this.$api.register(JSON.stringify(param))
                        .then((result = {code: "", msg: ""}) => {

                            if (result.code == "200") {

                                this.MessageBox("提示", "注册成功", 'alert', false, () => {
                                    location.href = "/login";
                                })
                            } else {
                                this.MessageBox("提示", result.msg, 'alert', false);
                            }
                        }).catch(err => {
                        this.MessageBox("错误", err, 'alert', false);
                    });
                }

            }
        }
    };
</script>
