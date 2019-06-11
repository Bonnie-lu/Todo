# 基于create-react-app 从头搭建react+ts+mobx+express 前端项目全家桶

## 本地运行

npm run start

## 打包

npm run build

## 部署

npm run prod

因为本项目是基于create-react-app二次搭建所有关于webpack配置处理比较少，以下是整个项目搭建以及在搭建过程遇到的一些问题:

- npm install -g create-react-app 全局安装，react脚手架

1. create-react-app my-app --scripts-version=react-scripts-ts // 创建ts版本
2. 由于需要配置webpack首先则需要npm run eject 获取所有的webpack配置，后续有一点需要去配置修改,然后执行npm install(安装没有被安装的包)，执行npm run start 项目就跑起来了
3. 整理项目的目录结构(只针对src目录)

- src          // 前端代码
    - components         //组件
    - layout             // 用于做全局弹窗，提示，loading等全局组件
    - pages              // 对应的前端路由页面
    - router             // 定义前端路由
    - server             // 定义为前端的http请求
    - stores             // 用于mobx管理
    - App.tsx            // 顶层页面
    - App.css            // css
    - index.tsx          // 与html页面相关联

4.上述目录整理好之后，先定义好 tslinlint.json ,这个json是用于规范你的ts代码:

这个是默认的配置

```
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"],
  "linterOptions": {
    "exclude": [
      "config/**/*.js",
      "node_modules/**/*.ts",
      "coverage/lcov-report/*.js"
    ]
  }
}
```

我们需要给这个json添加规则：rule

```
{
  "extends": ["tslint:recommended", "tslint-react", "tslint-config-prettier"], //内设配置项名称
  "rules": {
    "member-access": false,  // 可用非public
    "no-console": false,     // 可用console
    "max-classes-per-file": false, // 没有限制最大文件包含数量
    "variable-name": false,
    "no-namespace": false,
    "interface-name": false,
    "ordered-imports": false,
    "member-ordering": false,
    "no-var-requires": false,
    "object-literal-sort-keys": [false]
  },
  "linterOptions": {
    "include": ["src/**/*"],
    "exclude": ["config/**/*.js", "node_modules/**/*","bin/**/*", "app/**/*.js", "coverage/**/*", "dev/**/*", "dll/**/*"]
  }
}

```

可以发现：include和exclude 前者是检测包括指定目录，后者是不包括哪些目录
rules: 是校验规则暂时就添加以上几个
详细规则参照如下:
[tslint 官网](https://palantir.github.io/tslint/rules/variable-name/)

5.添加scss功能

先更改App.tsx页面

```
import * as React from 'react';
import './App.scss';
class App extends React.Component {
  render() {
    return (
      <div className="App">
        test app!!!
      </div>
    );
  }
}
export default App;
```

然后添加App.scss页面
```
.App {
  text-align: center;
  background:#f00;
}
```
![img](./images/mobx1.png)
样式没有加上是因为你缺少处理sass的工具
修改webpack配置包括dev和prod,找到如下模块然后进行修改
```
{
    test: /\.css$/,
    use: [
        require.resolve('style-loader'),
        {
        loader: require.resolve('css-loader'),
        options: {
            importLoaders: 1,
        },
        },
        {
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            ],
        },
        },
    ],
},
```

修改如下(注意：webpack.config.dev.js && webpack.config.prod.js 同步修改 )
```
{
    test: /\.s?css$/,
    use: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                importLoaders: 1,
            },
        },
        {
            loader: require.resolve('sass-loader')
        },
        {
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
                browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
            }),
            ],
        },
        },
    ],
},
```
并且安装sass-loader: npm install sass-loader webpack  chalk node-sass (如果报错缺少某些模块就自行添加)
安装成功后，运行就成功了
![img2](./images/mobx2.png)

6. 编写顶层app，权限最高的组件
App.js
```
import { createBrowserHistory } from 'history'
import * as React from 'react'
import {   Router } from 'react-router-dom'
const browserHistory = createBrowserHistory()
class App extends React.Component {
  public render() {
    return (
       <Router history={browserHistory}>
            <div>hello word!!!</div>
        </Router>
    )
  }
}
export default App
```
然后你会发现有很多包没有安装
npm install history @types/history @types/react-router-dom react-router-dom

//安装好上述包后就可以跑起来了

7. 关联mobx并且搭建路由
npm i mobx-react
npm i mobx
npm i mobx-react-router

在pages下新建文件夹login和文件夹lists 并且分别添加index.tsx

login/index.tsx

```
import * as React from 'react'
class Login extends React.Component<any> {
    login=()=>{
        console.log("点我登陆")
        this.props.history.push('/lists')
    }
    render(){
        return(
            <div>
               this is login!
               <button onClick={this.login}>登陆</button>
            </div>
        )
    }
}
export default Login
```

lists/index.tsx
```
import * as React from 'react'
class Lists extends React.Component<any> {
    backLogin=()=>{
        console.log("点我回到登陆")
        this.props.history.push('/login')
    }
    render(){
        return(
            <div>
               welcome come to lists!
               <button onClick={this.backLogin}>回到登陆页</button>
            </div>
        )
    }
}
export default Lists
```
router 文件夹下新建index.tsx
```
import * as  React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from "../pages/login"
import Lists from "../pages/lists"

class RootRoute extends React.Component {
  render() {
    return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/lists" component={Lists} />
          import * as  React from 'react'
import { Route, Switch , Redirect } from 'react-router-dom'
import Login from "../pages/login"
import Lists from "../pages/lists"

class RootRoute extends React.Component {
  render() {
    return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/lists" component={Lists} />
          <Redirect path="/" to={{pathname: '/login'}} /> //重定向路由
        </Switch>
    )
  }
}
// 未命中了路由显示 404页面
export default RootRoute

        </Switch>
    )
  }
}
export default RootRoute
```


整理并且修改App.tsx
```
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route  ,  Router } from 'react-router-dom'
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)
// 引入路由
import RootRoute from "./router"
class App extends React.Component {
  render() {
    return (
      <Provider>
        <Router history={history}>
            <Route component={RootRoute}/>
        </Router>
      </Provider>
    )
  }
}
export default App
```
哈哈已经跑起来是不是(ps:route4 还是很好用的后续会介绍一个比较好玩的功能)


8. 来一个common组件和一个公共页面
layout这个时候需要起到作用了，这里会把一些公共的loading 弹窗 的功能放到layout并且在最顶层页面

components 里面存放我们的公共组件，新建Hint文件夹

Hint/index.tsx
```
import * as React from 'react'
import "./index.scss"
class Hint extends React.Component<any> {
    render(){
        return(
            <div className="hint">
               提示{this.props.hint}!!!
            </div>
        )
    }
}

export default Hint
```
Hint/index.scss
```
.hint{
    width: 400px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    position: fixed;
    left: 50%;
    top: 0;
    margin-left: -200px;
    background: #ff0;
    color: green;
    font-size: 18px;
}
```

layout 文件夹下新建index
```
import * as React from 'react'
import Hint from "../components/hint"

class Layout extends React.Component<any> {
    render(){
        return(
            <div className="layout">
                hello layout!!!
                <Hint hint={"hello"}/>   
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export default Layout
```
此时项目的目录结构
![img3](./images/mobx3.png)

项目运行的结果上图
login page
![img4](./images/mobx4.png)

lists page
![img5](./images/mobx5.png)

到此时路由搭建成功，后续添加mobx管理数据

9. 添加mobx管理数据，common公共管理模块

在stores下添加common.ts
```
import { observable, action } from 'mobx'
class Common {
    @observable hint: boolean = false   // 用于展示弹窗
    @observable info: string = ""       // 用于显示弹窗的内容
    @observable timer: any              // 延时器的作用做一个delay
    @action showHint = (info:string) => {
        this.hint = true    
        this.info = info
      }
      // 2s 后执行操作
      @action hideHint = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.hideH, 2000)
      }
      @action hideH = () => {
        this.hint = false
        this.info = ''
      }
}
export default Common
```
在stores下添加root.ts
```
import Common from './common'
class RootStore {
  common: Common
  constructor() {
    this.common = new Common()
  }
}

export default RootStore
```

如果你用vs编辑器会有报错:装饰器提示“experimentalDecorators”
![img6](./images/mobx6.png)
然后找了一下解决方法：
找到tsconfig.json 
并且添加:
compilerOptions:{
   "experimentalDecorators": true,
   "emitDecoratorMetadata": true
}

然后重启vs就可以了,修改App.tsx
```
import { createBrowserHistory } from 'history'
import { Provider } from 'mobx-react'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route  ,  Router } from 'react-router-dom'
const browserHistory = createBrowserHistory()
const routingStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routingStore)
import RootStore from "./stores/root"  // 引用root store
// 引入路由
import RootRoute from "./router"
import Layout from "./layout"
export const rootStore = new RootStore()   // 其他地方需要用到
class App extends React.Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Layout>
          <Router history={history}>
              <Route component={RootRoute}/>
          </Router>
        </Layout>
      </Provider>
    )
  }
}
export default App
```

修改layout index页面让弹窗通过mobx下的数据进行操控
```
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hint from "../components/hint"
@inject('common')
@observer
class Layout extends React.Component<any> {
    render(){
        const { common } = this.props
        return(
            <div className="layout">
                hello layout!!!
                {common.hint&&<Hint hint={"hello"}/> }  
                <div>{this.props.children}</div>
            </div>
        )
    }
}
export default Layout
```

修改pages 下的lists index 
```
import * as React from 'react'
import { inject, observer } from 'mobx-react'
@inject('common')
@observer
class Lists extends React.Component<any> {
    backLogin=()=>{
        console.log("点我回到登陆")
        this.props.history.push('/login')
    }
    showHint=()=>{
        console.log("出现弹窗")
        this.props.common.showHint("展示弹窗啦!")
        this.props.common.hideHint()
    }
    render(){
        return(
            <div>
               welcome come to lists!
               <button onClick={this.backLogin}>回到登陆页</button>
               <button onClick={this.showHint}>出现弹窗&&2s后消失</button>
            </div>
        )
    }
}
export default Lists
``` 

你就会发现mobx管理数据已经ok了
![目录结构](./images/mobx7.png)

10. 添加异步处理http请求操作(出现loading弹窗)

暂时在components 下定义全局 loading组件（每当有http请求的时候出现）

components loading index
```
import * as React from 'react'
import "./index.scss"
class Loading extends React.Component<any> {
    render(){
        return(
            <div className="loading">
               loading 开始转圈了
            </div>
        )
    }
}
export default Loading
```
layout index 修改
```
import * as React from 'react'
import { inject, observer } from 'mobx-react'
import Hint from "../components/hint"
import Loading from "../components/loading"
@inject('common')
@observer
class Layout extends React.Component<any> {
    render(){
        const { common } = this.props
        return(
            <div className="layout">
                hello layout!!!
                {common.hint&&<Hint hint={"hello"}/> }  
                {common.loading&&<Loading/>}
                <div>{this.props.children}</div>
            </div>
        )
    }
}
export default Layout
```

stores common.ts 修改
```
import { observable, action } from 'mobx'

class Common {
    @observable hint: boolean = false
    @observable loading: boolean = false
    @observable info: string = ""
    @observable timer: any
    @observable timer2: any
    @action showHint = (info:string) => {
        this.hint = true
        this.info = info
      }
      // 2s 后执行操作
      @action hideHint = () => {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.hideH, 2000)
      }
      @action hideH = () => {
        this.hint = false
        this.info = ''
      }

      @action showLoading = () => (this.loading = true)
      @action hideLoading = () => { // 1s 后延迟关闭
        clearTimeout(this.timer2)
        this.timer2 = setTimeout(this.hideL, 1000)
      }
      @action hideL= () =>{
        this.loading = false
      }
}

export default Common
```


我们的server就要开始使用了
server 新建http.ts
```
import { rootStore } from '../App' // 顶层 rootstore(可以想一下为什么)
export const https = async (url: string = '', method: string = 'GET', body?: object) => {
  rootStore.common.showLoading() // showloading
  try {
    const headers: any = {
      'Centent-Type': 'application/json'
    }
    // 开始loading
    const res = await fetch(`${url}`, {
      method: method && method,
      headers,
      body: body && JSON.stringify(body)
    })
    const resJson = await res.json()
    // 结束loading
    rootStore.common.hideLoading() // hideloading
    return resJson
  } catch (error) {
    // 停止loading
    rootStore.common.hideLoading() // hideloading
    rootStore.common.showHint('后台接口报错') // 错误提示
    rootStore.common.hideHint()
    // console.log(error)
  }
}

```

server 新建api.ts
```
import { https } from './http'
// 编写所有的http请求
// 查询所有信息
export const _getInfo =( params:object) => https('/api/v1/xxx', 'POST', params)
```        

stores 新增login.ts
```
import { observable, action } from 'mobx'
import * as api from "../server/api"
class Login {
    @observable hint: boolean = false
    @action _login = async (cb:any) =>{
        const res = await api._login({name:"测试"})
        if(res&&res.success || 1){ // 默认通过
            cb()
        }
    }
}
export default Login
```
stores 修改root.ts
```
import Common from './common'
import Login from './login'
class RootStore {
  common: Common
  login: Login
  constructor() {
    this.common = new Common()
    this.login = new Login()
  }
}
export default RootStore
```
pages 下修改login 下的index.tsx
```
import * as React from 'react'
import { inject, observer } from 'mobx-react'
@inject('login')
@observer
class Login extends React.Component<any> {
    login=()=>{
        console.log("点我登陆")
        this.props.login._login(this.successcb)
    }
    successcb=()=>this.props.history.push('/lists')
    render(){
        return(
            <div>
               this is login!
               <button onClick={this.login}>登陆</button>
            </div>
        )
    }
}
export default Login
```
可以点击登陆后发现完美运行此时的目录结构：
![img8](./images/mobx8.png)

11. 添加express代理层，转发前端服务层
以上基本把项目搭建的差不多了，最后需要的是部署，目前前端部署都是架一个前端服务，渲染你的静态资源（打包后的前端文件）,同时前端服务还需要做代理转发层,现在我们就搭建express层
根目录下新建express.js
```
var express = require('express')
var path = require('path')
var proxy = require('http-proxy-middleware')
var proxyHost = "http://11111111:3000" // 用于代理的   ip + host
var app = express()
app.use(express.static(path.join(__dirname, 'build')))
app.use('/api', proxy({ target: proxyHost })) // 代理http请求
app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.use(function(req, res, next) {
	var err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use(function(err, req, res, next) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	res.status(err.status || 500)
	res.render('error')
})
module.exports = app
// 
```
根目录下新建bin 文件夹 下新建www.js
```
#!/usr/bin/env node
var app = require('../express');
var debug = require('debug')('demo:server');
var http = require('http');
var chalk = require('chalk')
var port = 3000;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  printInfo()
}
function printInfo(){
    console.log(chalk.red("阁下是不是又要写bug了"))
}
```

最后在package.json 下添加 
```
  "scripts": {
    "start": "node scripts/start.js",
    "prod": "node bin/www.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },
```

npm run build

npm run prod 如果出现以下的界面
![img9](./images/mobx9.png)