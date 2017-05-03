import { Component } from '@angular/core';
import { Todo } from '../../model/todo';
import {SearchComponent} from './search.component';

import { InMemoryTodoService } from '../../service/in-memory-todo.service';

describe('SearchComponentUnit', () => {
  let component: SearchComponent;
  let service: InMemoryTodoService;

  beforeEach(() => {
      service = new InMemoryTodoService();
      component = new SearchComponent(service);
  });

  it('should call service to fetch all todos and filter exact match', () => {
    spyOn(service, 'getTodos').and.callThrough();

    component = new SearchComponent(service);

    component.search('Todo 1');

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.searchRes).toContain(new Todo(0, 'Todo 1', false));
  });

  it('should filter partial match', () => {
    component.search('do 1');

    expect(component.searchRes).toContain(new Todo(0, 'Todo 1', false));
  });

  // it('should fetch todos again on receiving event', () => {
  //   spyOn(service, 'getTodos').and.callThrough();
  //
  //   component = new SearchComponent(service);
  //
  //   component.onEvent('event');
  //
  //   expect(service.getTodos).toHaveBeenCalled();
  // });
});
