<template>
    <div v-if="isShow">
        <div class="modal" tabindex="-1" role="dialog" aria-hidden="true" style="display: block">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" name="close" data-dismiss="modal" aria-hidden="true" v-if="is_show_close">&times;
                        </button>
                        <h4 class="modal-title" v-if="escape" v-html="title"></h4>
                        <h4 class="modal-title" v-else>{{title}}</h4>
                    </div>

                    <div class="modal-body" v-if="escape" v-html="message"></div>
                    <div class="modal-body" v-else>{{message}}</div>

                    <div class="modal-footer">
                        <button type="button" name="close" class="btn btn-default" v-if="is_show_close"
                                data-dismiss="modal">{{closeTxt}}
                        </button>
                        <button type="button" name="confirm" class="btn btn-primary">{{confirmTxt}}</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
        <div class="modal-backdrop fade in"></div>
    </div>
</template>
<script>
    export default {
        name: 'MessageBox',
        data() {
            return {
                isShow: true,
                title: "",
                message: "",
                type: "information",
                escape: false,
                is_show_close: true,
                closeTxt: '取消',
                confirmTxt: '确认',
                callback: () => {
                },
                cancel: () => {
                }
            };
        },
        mounted() {
            let self = this;
            self.setOption();
            $("button[name='close']", this.$el).on("click.modal", function () {
                self.close(() => {
                    self.cancel(this);
                });
            });
            $("button[name='confirm']", this.$el).on("click.modal", function () {
                self.close(() => {
                    self.callback(this);
                });
            });
        },
        methods: {
            setOption(option = {}) {
                switch (this.type) {
                    case "alert":
                        this.is_show_close = false;
                        break;
                    case "information":
                        this.is_show_close = true;
                        break;
                    default:
                }
            },
            show() {
                this.isShow = true;
            },
            close(cb) {
                this.isShow = false;
                cb();
            }
        }
    };
</script>