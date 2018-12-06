<template>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>用户管理</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <div id="datatable_wrapper" class="datatables_wrapper form-inline dt-bootstrap no-footer">
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="table-container" class="table display">
                                <col width="15%"/>
                                <col width="15%"/>
                                <col width="15%"/>
                                <col width="15%"/>
                                <col width="20%"/>
                                <col width="15%"/>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    #add {
        margin-left: 20px;
    }

    [role="row"] {
        cursor: pointer;
        &.even {
            background-color: #f8f8f8;
        }
        &:hover {
            font-weight: bolder;
        }
        i {
            &.yellow {
                background-color: yellow;
            }
        }
        .operate {
            li {
                list-style: none;
                float: left;
                padding-left: 3px;
                .glyphicon {
                    &:hover {
                        color: #1abb9c;
                    }
                }
            }
        }
    }

    .edit {
        overflow: auto;
        .rowEdit {
            position: relative;
            zoom: 1;
            clear: both;
            padding: 5px 16%;
            border: 1px solid transparent;
            overflow: auto;
            label {
                float: left;
                width: 20%;
                padding-top: 6px;
            }
            input {
                float: right;
                width: 80%;
            }
            &.role {
                input {
                    float: left;
                    width: 17px;
                }
            }
        }
    }

    .delete {
        text-decoration: line-through;
        text-decoration-color: black;
    }
</style>

<script>

    let editHtml = (obj) =>
        `<div class="edit">
            <div class="rowEdit">
                <label for="username">用户名:</label>
                <input type="text" name="username" value="${obj.username}">
            </div>
            <div class="rowEdit">
                <label for="email">邮箱:</label>
                <input type="email" name="email" value="${obj.email}">
            </div>

        <div class="rowEdit role">
            <label for="role">角色:</label>
            <label><input type="checkbox" name="role" id="guest" value="guest">游客</label>
            <label><input type="checkbox" name="role" id="member" value="member">普通会员</label>
            <label><input type="checkbox" name="role" id="superMember" value="superMember">超级会员</label>
            <label><input type="checkbox" name="role" id="admin" value="admin">管理员</label>
        </div>
    </div>`;


    let addHtml = () =>
        `<div class="edit">
            <div class="rowEdit">
                <label for="username">用户名:</label>
                <input type="text" name="username" value="" placeholder="用户名由英文字母和数字组成的4-16位字符，以字母开头">
            </div>
            <div class="rowEdit">
                <label for="password">密码:</label>
                <input type="text" name="password" value="" placeholder="密码由英文字母或数字组成的6-18位字符">
            </div>
            <div class="rowEdit">
                <label for="email">邮箱:</label>
                <input type="email" name="email" value="">
            </div>

        <div class="rowEdit role">
            <label for="role">角色:</label>
            <label><input type="checkbox" name="role" id="guest" value="guest" >游客</label>
            <label><input type="checkbox" name="role" id="member" value="member" >普通会员</label>
            <label><input type="checkbox" name="role" id="superMember" value="superMember" >超级会员</label>
            <label><input type="checkbox" name="role" id="admin" value="admin" >管理员</label>
        </div>
    </div>`;


    let Crypto = require('crypto');
    let md5Sign = function (data) {
        let md5 = Crypto.createHash('md5').update(data).digest('hex');
        return md5;
    };
    export default {
        name: 'user',
        mounted() {
            let self = this,
                searchContent = "",
                searchType = "value";
            // 绑定 DataTable
            let table = $("#table-container", this.$el).dataTable({
//                    autowidth: true,
                    bSort: false,
                    columns: [
                        // table thead th
                        {data: "id", title: "ID"},
                        {data: "username", title: "用户名"},
                        {data: "password", title: "密码"},
                        {data: "email", title: "邮箱"},
                        {data: "role", title: "角色"},
                        {
                            // 编辑、删除按钮
                            title: "操作",
                            class: "operate",
                            render(data, type, row) {
                                return `<div class="row">
                                        <ol>
                                            <li>
                                                <span title="编辑" class="glyphicon glyphicon-edit"></span>

                                            </li>
                                            <li>
                                                <span title="删除" class="glyphicon glyphicon-trash"></span>
                                            </li>
                                            <li>
                                                <button type="reset" id="setPassword" class="btn btn-primary btn-xs">重置密码</button>
                                            </li>
                                        </ol>
                                   </div>`;
                            }
                        }
                    ],
                    fnRowCallback: function (nRow, aData, iDisplayIndex) {
                        /**
                         * 渲染前可以获取每一行虚拟dom元素和对应数据
                         * 用来高亮查询项
                         */
                        if (searchContent !== "" && aData[searchType].search(searchContent) !== -1) {
                            $("td", nRow)
                                .eq(({"username": "1", "password": "2"})[searchType])
                                .html(
                                    aData[searchType].replace(
                                        new RegExp(`(${searchContent})`, "g"),
                                        '<i class="yellow">$1</i>'
                                    )
                                );
                        }
                        return nRow;
                    },
                    // 渲染之后可以获取到 dom元素 既可以绑定 新增 编辑 删除按钮事件
                    fnDrawCallback: function () {

                        //用户新增
                        $('#add').on('click', function () {
                            self.MessageBox('新增用户', addHtml(), 'information', true, () => {
                                let role = JSON.stringify([...$("input:checkbox[name='role']:checked").map((index, ele) => $(ele).val())]);
                                let searchParam = {
                                    username: $.trim($("input[name='username']").val()),
                                    password: md5Sign($.trim($("input[name='password']").val())),
                                    email: $.trim($("input[name='email']").val()),
                                    role: role
                                };

                                self.$api.addUser(searchParam)
                                    .then((result) => {
                                        if (result.code == "200") {
                                            table.api().ajax.reload(null, true);
                                        } else {
                                            self.MessageBox("提示", result.msg, 'alert', false);
                                        }
                                    })
                                    .catch(err => {
                                        self.MessageBox("错误", err, 'alert', false);
                                    });
                            });

                        });

                        //用户编辑
                        $('span.glyphicon-edit').on('click', function () {
                            let that = this;
                            let info = {
                                id: $(that).parents('tr').find('td:eq(0)').text(),
                                username: $(that).parents('tr').find('td:eq(1)').text(),
//                            password: $(that).parents('tr').find('td:eq(2)').text(),
                                email: $(that).parents('tr').find('td:eq(3)').text(),
                                role: JSON.parse($(that).parents('tr').find('td:eq(4)').text())
                            };
                            self.MessageBox('编辑用户', editHtml(info), 'information', true, () => {
                                let role = JSON.stringify([...$("input:checkbox[name='role']:checked").map((index, ele) => $(ele).val())]);
                                let searchParam = {
                                    where: {id: info.id},
                                    value: {
                                        username: $.trim($("input[name='username']").val()),
                                        email: $.trim($("input[name='email']").val()),
                                        role: role
                                    }
                                };
                                self.$api.editUser(searchParam)
                                    .then((result) => {
                                        if (result.code === "200") {
                                            $(that).parents('tr').find('td:eq(1)').text(searchParam.value.username);
                                            $(that).parents('tr').find('td:eq(3)').text(searchParam.value.email);
                                            $(that).parents('tr').find('td:eq(4)').text(searchParam.value.role);
                                        } else {
                                            self.MessageBox("提示", result.msg, 'alert', false);
                                        }
                                    })
                                    .catch(err => {
                                        self.MessageBox("错误", err, 'alert', false);
                                    });
                            });
                            info.role.map(role => {
                                $('input#' + role).attr('checked', true);
                            });
                        });

                        //用户删除
                        $('span.glyphicon-trash').on('click', function () {
                            let that = this;
                            let params = {
                                id: $(that).parents('tr').find('td:eq(0)').text()
//                            value: $(that).parents('tr').find('td:eq(2)').text(),
                            };

                            self.MessageBox('删除', '确定要删除这个用户信息', 'information', false, () => {
                                self.$api.deleteUser(params)
                                    .then((result) => {
                                        if (result.code === "200") {
                                            if (!$(that).parents('tr').hasClass('delete')) $(that).parents('tr').addClass('delete');
                                        } else {
                                            self.MessageBox("提示", result.msg, 'alert', false);
                                        }
                                    })
                                    .catch(err => {
                                        self.MessageBox("错误", err, 'alert', false);
                                    });
                            });
                        });

                        //密码重置
                        $('button#setPassword').on('click', function () {
                            let that = this;
                            let params = {
                                where: {id: $(that).parents('tr').find('td:eq(0)').text()},
                                value: {password: md5Sign('123456')}
                            };

                            self.MessageBox('提示', '默认重置密码为123456,确定要重置该用户的密码？', 'information', false, () => {
                                self.$api.editUser(params)
                                    .then((result) => {
                                        if (result.code === "200") {
                                            table.api().ajax.reload(null, true);
                                        } else {
                                            self.MessageBox("提示", result.msg, 'alert', false);
                                        }
                                    })
                                    .catch(err => {
                                        self.MessageBox("错误", err, 'alert', false);
                                    });
                            });
                        });
                    },
                    bProcessing: true, //刷新的那个对话框
                    serverSide: true, //服务器端获取数据
                    paging: true, //开启分页
                    ajax(params, callback)
                    { // ajax查询数据库
                        // 查询内容 若带%表示模糊查询
                        searchContent = params.search.value.trim();
                        let searchParam = {
                            page: params.start,
                            limit: params.length
                        };
                        searchType = $("#searchType").val(); // 查询 文案（value）/key
                        searchParam[searchType] = searchContent;
                        self.$api
                            .queryUser(searchParam, true)
                            .then(({data}) => {
                                searchContent = searchContent.replace(/%/g, "");
                                callback(data);
                            })
                            .catch(err => {
                                console.error(err);
                            });
                    }
                    ,
                    oLanguage: {
                        sProcessing: "正在获取数据，请稍后...",
                        sLengthMenu: '显示 _MENU_ 条<button id="add" class="btn btn-success" type="button"><span class="glyphicon glyphicon-plus">新增</span></button>',
                        sZeroRecords: "没有您要搜索的内容",
                        sInfo: "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                        sInfoEmpty: "记录数为0",
                        sSearch: '搜索&nbsp;&nbsp;<select id="searchType" class="form-control input-sm"><option value="username">用户名</option><option value="email">邮箱</option></select>&nbsp;',
                        oPaginate: {
                            sFirst: "第一页",
                            sPrevious: "上一页",
                            sNext: "下一页",
                            sLast: "最后一页"
                        }
                    }
                })
            ;

        }
    }
    ;
</script>