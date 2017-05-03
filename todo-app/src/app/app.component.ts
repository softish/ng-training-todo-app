import { Component, OnInit } from '@angular/core';
import { InMemoryTodoService } from './service/in-memory-todo.service';
import { Todo } from './model/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {
  title = 'ng-todo!';
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
