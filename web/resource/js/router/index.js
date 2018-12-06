import VueRouter from 'vue-router';

import compile from '../components/menu1/index.vue';
import publish from '../components/menu2/index.vue';
import user from '../components/user/index.vue';
import permission from '../components/permission/index.vue';

export default new VueRouter({
    "routes": [
        { "path": "/menu1", component: compile },
        { "path": "/menu2", component: publish },
        { "path": "/user", component: user },
        { "path": "/permission", component: permission },
    ]
});

