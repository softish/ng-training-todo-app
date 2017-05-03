import { Injectable } from '@angular/core';
import { Todo } from '../app.component';

@Injectable()
export class InMemoryTodoService {
  todos: Todo[];
  id: number = 0;

  constructor() {
    this.todos = [
      new Todo(this.id++, 'Todo 1', false),
      new Todo(this.id++, 'Todo 2', false),
      new Todo(this.id++, 'Todo 3', false)
    ];
  }

  getTodos() : Todo[] {
    return this.todos;
  }

  addTodo(name : string){
    this.todos.push(new Todo(this.id++, name, false));
  }

  deleteTodo(id: number) {
    this.todos.splice(id, 1);
  }

  updateDone(id: number, isDone: boolean) {
    this.todos[id].isDone = isDone;
  }

  updateName(id: number, newName: string) {
    this.todos[id].name = newName;
  }
}
