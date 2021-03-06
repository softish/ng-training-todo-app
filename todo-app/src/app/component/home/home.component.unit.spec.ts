import { Component } from '@angular/core';
import { HomeComponent} from './home.component';
import { InMemoryTodoService } from '../../service/in-memory-todo.service';
import { Todo } from '../../model/todo';

describe('HomeComponentUnit', () => {
  let component: HomeComponent;
  let service: InMemoryTodoService;

  beforeEach(() => {
      service = new InMemoryTodoService();
      component = new HomeComponent(service);
  });

  it('should call service to fetch todos on ngOnInit', () => {
    spyOn(service, 'getTodos').and.callThrough();

    component = new HomeComponent(service);
    component.ngOnInit();

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos).not.toBeNull();
  });

  it('should call service to add new todo and fetches all the todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'addTodo').and.callThrough();

    component = new HomeComponent(service);

    component.todo = 'New Task';
    component.onSubmit();

    expect(service.addTodo).toHaveBeenCalledWith('New Task');

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(4);
  });
});
