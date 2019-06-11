import { observable, action } from 'mobx'
interface TodoType {
    id ?:number
    finished ?:boolean
}

class TodoList {
    @observable todos:TodoType[] = [];
    @action finishedToggle(id:number) {
        this.todos = this.todos.map((todo,index) => {
            if (index === id) {
              todo.finished = !todo.finished;
            }
            return todo;
          });
      }
    @action createTodo(value:any) {
        value.id = Math.random();
        value.finished = false;
        this.todos.push(value);
        
    }

  }
export default  TodoList