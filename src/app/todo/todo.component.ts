import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../class/todo-class';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoValue = '';
  todoList: Todo[] = [new Todo('Learn Angular', false), new Todo('Read a book', false)];
  todoCompletedList: Todo[] = [new Todo('Buy Grocery', false), new Todo('Go Shopping', false)];

  constructor(private modalService: NgbModal){}

  addTodoItem(){
    this.todoList.push(new Todo(this.todoValue, false))
    this.todoValue = '';
  }

  addToCompletedList(index: number){
    const item: Todo = this.todoList.splice(index, 1)[0];
    this.todoCompletedList.push(item);
  }

  changeTodoList(index: number){
    const item: Todo = this.todoCompletedList.splice(index, 1)[0];
    this.todoList.push(item);
  }


  openModal(content: TemplateRef<Element>, i: number, type: string){
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result)=> {
        if(type == 'todoList'){
          this.todoList.splice(i,1);
        } else {
          this.todoCompletedList.splice(i,1);
        }
      },
      (resolve)=>{}
    )
  }

  editOpenModal(editContent: TemplateRef<Element>, i: number, item: Todo,type: string){
    this.todoValue = item.content;
    this.modalService.open(editContent, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result)=> {
        if(type == 'todoList'){
          this.todoList[i].content = this.todoValue;
        } else {
          this.todoCompletedList[i].content = this.todoValue;
        }
      },
      (resolve)=>{}
    )
  }

}
