import { Component, OnInit } from '@angular/core';
import { InMemoryTodoService } from '../../service/in-memory-todo.service';
import { Todo } from '../../model/todo';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  searchRes: Todo[];

  constructor(private service: InMemoryTodoService) { }

  ngOnInit() {

  }

  search(query: string) {
    this.searchRes = this.service.getTodos().filter((todo) => {
      return todo.name.indexOf(query) >= 0;
    });
  }

  onEvent(event) {
    this.search(this.query);
  }
}
