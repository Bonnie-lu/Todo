import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Route,Switch } from "react-router-dom"
import First from "../../components/FirstPage"
import Second from "../../components/SecondPage"
import './index.scss'

@inject('tolist')
@observer

class Todo extends React.Component<any>{
    state ={
        value :"",
    }
    // 输入框输入
    change = (e:any) => {
        this.setState({
          value:e.target.value,
        })
    }
    // 添加listitem
    add = (e:any) => {
        e.preventDefault();
        const value = this.state.value.trim();
        if(value) {
            this.props.tolist.createTodo({
                title:value,
            });
            this.setState({
                value: ''
            });
        } else {
            alert('输入不能为空！！');
        }
    }
    // 跳转页面至hello页面
    goto = () =>{
        this.props.history.push('/hello')
    }
    goFirst = () => {
        this.props.history.push('/list/first')
    }
    goSecond = () => {
        console.log(this.props.history);
        this.props.history.push("/list/second")
    }
    // listitem完成和取消完成处理
    finished = (key:number) =>() => {
        this.props.tolist.finishedToggle(key);
    }
    render(){
        const {tolist:{todos}} = this.props
        return(
            <div>
                <p>welcome come to lists!</p>
                <input type="text" placeholder="添加工作计划" onChange={this.change} value={this.state.value}/>
                <button onClick={this.add}>添加</button>
                <ul>
                        {
                            todos.length > 0 && todos.map((item:any,key:number)=>{
                                return(
                                    <li key={item.id} className={item.finished ? "completed":""}>
                                        <label>
                                            <input type="checkbox" checked={item.finished} onChange={this.finished(key)}  />
                                            {item.title}
                                        </label>
                                    </li>
                                )
                            })
                        }
                </ul>
                <button onClick = {this.goFirst}>First Page</button>
                <button onClick = {this.goSecond}>Second Page</button>
                <button onClick={this.goto}>页面跳转</button>
                        <Switch>
                            {/* <Route exact={true} path="/hello/first" component={First} />  */}
                            <Route path="/list/first" component={First}/>
                            <Route path="/list/second" component={Second}/>
                        </Switch>
                
            </div>
        )
    }
}

export default Todo