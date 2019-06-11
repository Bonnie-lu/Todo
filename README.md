# 新手村--熟悉markdown语法、搭建react+mobx+typescript项目
## 搭建项目
* npm i create-react-app -g : 全局安装脚手架create-react-app
* create-react-app my-app --scripts-version=react-scripts-ts  创建一个ts+react项目
* cd my-app 进入my-app文件下
* ls 查看当前目录下的内容列表
* npm run start 启动项目
* npm run eject 显示配置文件config，scripts两个文件夹
* npm run test  启动测试

## 创建/src/components /src/pages /src/layout

* 创建一个入口页面 layout
* 创建一个子页面   todolist
* 创建一个子页面   hello

## 添加mobx

npm i mobx mobx-react --save

* 创建一个RootStore，绑定子store Todolist
* 创建子sotre Todolist,@observable定义state,@action定义action更改state
* 在App.tsx文件，通过Provider 将rootstore传递下去
* 在todolist.tsx页面，@eject绑定store,@observer观察者身份

## 路由跳转

npm i @types/react-router-dom react-router-dom @types/history history mobx-router ：4.0.7

## 碰到的问题

* test跑不起来:ENOSPC: System limit for number of file watchers reached
> sudo gedit /etc/sysctl.conf
> fs.inotify.max_user_watches=524288 添加到最后一行
> sudo sysctl -p

## jest

npm i --save-dev enzyme enzyme-adapter-react-16
创建./test/test.ts

```test.ts
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

export default Enzyme;
```

* expect:匹配器
* 断言库：jquery式的链式调用
* 函数测试覆盖率 render()&&其他函数

## code review

>> 使用interface接口做数据类型检测
>> router4.0版本以上的 嵌套路由会有问题
>> 代码注释：函数适当的注明功能
