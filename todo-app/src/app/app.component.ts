import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo app works!';
  todos: Todo[];
  editingEnabled: boolean[];
  todo: string = '';

  constructor() {
    this.todos = [new Todo('Todo 1', false), new Todo('Todo 2', false), new Todo('Todo 3', false)];
    this.editingEnabled = [false, false, false];
  }

  onSubmit() {
    this.todos.push(new Todo(this.todo, false));
    this.todo = '';
  }

  delete(index: number) {
    this.todos.splice(index, 1);
  }

  toggleDone(index: number) {
    this.todos[index].isDone = !this.todos[index].isDone;
  }

  enableEditing(index: number) {
    this.editingEnabled[index] = true;
  }

  disableEditing(index: number) {
    this.editingEnabled[index] = false;
  }
}

export class Todo {
  name: string;
  isDone = false;

  constructor (name: string, isDone: boolean) {
    this.name = name;
    this.isDone = isDone;
  }
}
