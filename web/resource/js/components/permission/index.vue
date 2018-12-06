<template>
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="x_panel">
            <div class="x_title">
                <h2>权限管理</h2>
                <div class="clearfix"></div>
            </div>
            <div class="x_content">
                <div id="datatable_wrapper" class="datatables_wrapper form-inline dt-bootstrap no-footer">
                    <div class="row">
                        <div class="col-sm-12">
                            <table id="table-container" class="table display">
                                <col width="20%"/>
                                <col width="70%"/>
                                <col width="10%"/>
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
    let addHtml = () =>
        `<div class="edit">
            <div class="rowEdit">
                <label for="action">action:</label>
                <input type="text" name="action" value="" placeholder="请输入请求action，例：‘/xxx’">
            </div>
        <div class="rowEdit role">
            <label for="route">permission:</label>
            <label><input type="checkbox" name="route"  value="get" >get</label>
            <label><input type="checkbox" name="route"  value="post" >post</label>
            <label><input type="checkbox" name="route"  value="delete" >delete</label>
            <label><input type="checkbox" name="route"  value="put" >put</label>
        </div>
    </div>`;

    export default {
        name: 'user',
        mounted() {
            let self = this,
                searchContent = "",
                searchType = "value";
            // 绑定 DataTable
            let table = $("#table-container", this.$el).dataTable({
                    autowidth: true,
                    bProcessing: true,
                    dom: 'lBrtip',  //隐藏搜索框
                    bSort: false,
                    columns: [
                        // table thead th
                        {data: "role", title: "角色"},
                        {data: "permission", title: "权限"},
                        {
                            // 编辑、删除按钮
                            title: "操作",
                            class: "operate",
                            render(data, type, row) {
                                return `<div class="row">
                                        <ol>
                                          <li>
                                                <span title="删除" class="glyphicon glyphicon-trash"></span>
                                            </li>
                                            <li>
                                                <span  title="增加" class="glyphicon glyphicon-plus" aria-hidden="true"></span>
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

                        //新增
                        $('span.glyphicon-plus').on('click', function () {
                                let that = this;
                                self.MessageBox('新增权限',addHtml(),'information',true,()=>{
                                    let http = [...$("input:checkbox[name='route']:checked").map((index, ele) => $(ele).val())];
                                    let searchParam = {
                                        role: $.trim($(that).parents('tr').find('td:eq(0)').text()),
                                        resource: $.trim($("input[name='action']").val()),
                                        http: http
                                    };
                                    self.$api.addResource(searchParam)
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

                                })
                            }
                        );
                        //删除
                        $('span.glyphicon-trash').on('click', function () {
                            let that = this;

                            self.MessageBox("删除权限",addHtml(),'information',true,()=>{
                                let http = [...$("input:checkbox[name='route']:checked").map((index, ele) => $(ele).val())];
                                let searchParam = {
                                    role: $.trim($(that).parents('tr').find('td:eq(0)').text()),
                                    resource: $.trim($("input[name='action']").val()),
                                    http: http
                                };
                                self.$api.deleteResource(searchParam)
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
                            })
                        });
                    },
                    bProcessing: true, //刷新的那个对话框
                    serverSide: true, //服务器端获取数据
                    paging: true, //开启分页
                    ajax(params, callback)
                    {
                        self.$api
                            .queryResource()
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
                        sLengthMenu: '显示 _MENU_ 条',
                        sZeroRecords: "没有您要搜索的内容",
                        sInfo: "从 _START_ 到  _END_ 条记录 总记录数为 _TOTAL_ 条",
                        sInfoEmpty: "记录数为0",
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