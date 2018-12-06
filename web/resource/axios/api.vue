<script>
    import axios from "axios";
    axios.defaults.baseURL = "http://127.0.0.1:3000";

    export default {
        data() {
            return {};
        },
        getMenu() {
            return axios.get("/menu");
        },
        //注册登录
        register(searchCond = {username: "", password: "", email: ""}){
            return axios.post('/user/register', {searchCond}).then(({data}) => data);
        },
        login(searchCond = {username: "", password: ""}){
            return axios.post('/user/login', {searchCond}).then(({data}) => data);
        },


        //用户管理(查询、编辑、删除)
        queryUser(searchCond = {username: "", email: "", role: "", updatedAt: null}, isFuzzy = false) {
            return axios.get('/user', {params: {searchCond, isFuzzy}}).then(({data}) => data)
        },
        editUser(searchCond = {where: "", value: ""}) {
            return axios.post('/user', {searchCond}).then(({data}) => data);
        },
        deleteUser(searchCond = {username: ""}) {
            return axios.delete('/user', {data: {searchCond}}).then(({data}) => data);
        },
        addUser(searchCond = {username: "", password: "", email: "", role: "",}) {
            return axios.put('/user', {searchCond}).then(({data}) => data);
        },

        //检测左侧功能栏
        checkMenu(){
            return axios.get('/menu').then(({data}) => data);
        },

        //权限管理
        queryResource() {
            return axios.get('/permission').then(({data}) => data);
        },
        addResource(searchCond = {role: "", resource:"",http:""}){
            return axios.put('/permission',{searchCond}).then(({data}) => data);
        },
        deleteResource(searchCond = {role: "", resource:"",http:""}){
            return axios.delete('/permission',{data: {searchCond}}).then(({data}) => data);
        }
    };


</script>