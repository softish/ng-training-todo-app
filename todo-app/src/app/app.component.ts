import { Component, OnInit } from '@angular/core';
import { InMemoryTodoService } from './service/in-memory-todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InMemoryTodoService]
})
export class AppComponent implements OnInit {
  title = 'todo app works!';
  todos: Todo[];

  todo: string = '';

  constructor(private service: InMemoryTodoService) {
  }

  ngOnInit() {
    this.todos = this.service.getTodos();
  }

  onSubmit() {
    // Need to push editing enabled here to keep todos and editingEnabled in sync
    this.service.addTodo(this.todo);

    this.todos = this.service.getTodos();
    this.todo = '';
  }

  onEvent(event: string) {
    this.todos = this.service.getTodos();
  }
}

export class Todo {
  id: number;
  name: string;
  isDone = false;

  constructor (id: number, name: string, isDone: boolean) {
    this.id = id;
    this.name = name;
    this.isDone = isDone;
  }
}
