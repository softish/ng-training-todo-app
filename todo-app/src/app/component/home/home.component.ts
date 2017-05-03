import { Component, OnInit } from '@angular/core';

import { Todo } from '../../app.component';
import {InMemoryTodoService} from '../../service/in-memory-todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [InMemoryTodoService]
})
export class HomeComponent implements OnInit {
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
