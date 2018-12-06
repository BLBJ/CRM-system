const fs = require('fs');


let readDir = (path)=>{
    let dirList;
    try {
        dirList = fs.readdirSync(path);
    }catch (e) {
        dirList = [];
    }
    return dirList;
}

let isDir=(path)=>{
    let isDir;
    try {
        isDir = fs.statSync(path).isDirectory();
    }catch (e) {
        isDir = false;
    }
    return isDir;
}

let getRoutePath = (path)=>{
    let modules = [];
    let paths = [path];
    do{
        let path = paths.pop();
        readDir(path).map(item=>{
            if (isDir(path+'/'+item)){
                paths.push(path + '/' + item);
            }else {
                modules.push(path+'/'+item);
            }
        })

    }while(paths.length !==0);
    // console.log('加载的路径为' + JSON.stringify(modules));
    return modules;
};
function getStack(layer)
{
    let stack = this;
    switch (layer.name)
    {
        case "router":
        {
            layer.handle.stack.forEach(getStack.bind(stack));
            break;
        }
        case "bound dispatch":
        {
            stack.push(layer.route.path);
            break;
        }
        case "<anonymous>":
        {
            //这种类型是局部拦截器模块，忽略
            break;
        }
        default :
        {
            console.warn(layer.name);
        }
    }
}
module.exports = (router,path)=>{
    getRoutePath(path).map(p=>{
        let router_ = require(p);
        if (router_.prototype.constructor.name !== "router")
        {
            throw "[routers模块加载出现异常],%path".replace("%path", path);
        }
        router.use(router_);
    });
    let stack = [];
    //深度遍历出所有可使用路径
    router.stack.forEach(getStack.bind(stack));

    return stack;

};

