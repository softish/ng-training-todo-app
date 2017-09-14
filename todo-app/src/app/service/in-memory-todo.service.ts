import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';

@Injectable()
export class InMemoryTodoService {
  todos: Todo[];
  id: number = 0;

  constructor() {
    console.log('in mem service created');
    this.todos = [
      new Todo(this.id++, 'Todo 1', false),
      new Todo(this.id++, 'Todo 2', false),
      new Todo(this.id++, 'Todo 3', false)
    ];
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(name: string) {
    this.todos.push(new Todo(this.id++, name, false));
  }

  deleteTodo(id: number) {
    console.log('delete called' + id);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos.splice(i, 1);
      }
    }
  }

  updateDone(id: number, isDone: boolean) {
    console.log('update done called' + id);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos[i].isDone = isDone;
      }
    }
  }

  updateName(id: number, newName: string) {
    console.log('update name called' + id);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id === id) {
        this.todos[id].name = newName;
      }
    }
  }
}
