import { Component } from '@angular/core';
import { InMemoryTodoService } from './service/in-memory-todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InMemoryTodoService]
})
export class AppComponent {
  title = 'todo app works!';
  todos: Todo[];
  editingEnabled: boolean[];
  editedTodo: string[];
  todo: string = '';

  constructor(private service: InMemoryTodoService) {
    this.todos = this.service.getTodos();
    this.editingEnabled = [false, false, false];
    this.editedTodo = [];
    this.todos.forEach((eachTodo) => {
      this.editedTodo.push(eachTodo.name);
    });
  }

  onSubmit() {
    // Need to push editing enabled here to keep todos and editingEnabled in sync
    this.service.addTodo(new Todo(this.todo, false));

    this.editingEnabled.push(false);
    this.editedTodo.push(this.todo);

    this.todos = this.service.getTodos();
    this.todo = '';
  }

  delete(id: number) {
    this.service.deleteTodo(id);
    this.todos = this.service.getTodos();
  }

  toggleDone(id: number) {
    this.service.updateDone(id, !this.todos[id].isDone);
    this.todos = this.service.getTodos();
  }

  enableEditing(id: number) {
    this.editingEnabled[id] = true;
  }

  disableEditing(id: number) {
    this.editingEnabled[id] = false;
  }

  renameTodo(id: number, newName: string) {
    console.log('rename called');
    this.service.updateName(id, newName);
    this.editingEnabled[id] = false;
    this.todos = this.service.getTodos();
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
