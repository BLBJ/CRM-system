<template>
    <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
        <div class="menu_section active">
            <h3>功能区</h3>
            <ul class="nav side-menu">
                <li v-for="(item,index) in menu" v-bind:key="index" >
                    <a><i class="fa fa-desktop"></i> {{item.title}}</a>
                    <ul class="nav child_menu">
                        <router-link  v-for="(item_,index_) in item.list" tag="li"
                                      v-bind:key="index_"
                                      v-bind:class="{'current-page': isCurrent}"
                                      v-bind:to="item_.route"
                                      v-on:click="isCurrent=!isCurrent">
                            <a href="javascript:void(0);">{{item_.name}}</a>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
    const init_sidebar = require("./src/init_sidebar.js");
    export default {
        name: "myMenu",
        data() {
            return {
                menu: [],
                isCurrent: false,
            };
        },
        mounted() {
            let self = this;
            self.$api.checkMenu()
                .then(({data}) => {
                    self.menu = data;
                    setTimeout(init_sidebar,0);
                }).catch((err)=>{
                console.error(err);
            });
        }
    };

</script>
