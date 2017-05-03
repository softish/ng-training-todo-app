import { Injectable } from '@angular/core';
import { Todo } from '../app.component';

@Injectable()
export class InMemoryTodoService {
  todos: Todo[];

  constructor() {
    this.todos = [
      new Todo('Todo 1', false),
      new Todo('Todo 2', false),
      new Todo('Todo 3', false)
    ];
  }

  getTodos() : Todo[] {
    return this.todos;
  }

  addTodo(todo : Todo){
    this.todos.push(todo);
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
