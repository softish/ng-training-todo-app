import { Component } from '@angular/core';
import { AppComponent, Todo } from './app.component';
import { InMemoryTodoService } from './service/in-memory-todo.service';

describe('AppComponentUnit', () => {
  let component: AppComponent;
  let service: InMemoryTodoService;

  beforeEach(() => {
      service = new InMemoryTodoService();
      component = new AppComponent(service);
  });

  it(`should have a title with value 'todo app works!'`, () => {
    expect(component.title).toEqual('todo app works!');
  });

  it('should call service to fetch todos on ngOnInit', () => {
    spyOn(service, 'getTodos').and.callThrough();

    component = new AppComponent(service);
    component.ngOnInit();

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos).not.toBeNull();
  });

  it('should call service to add new todo and fetches all the todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'addTodo').and.callThrough();

    component = new AppComponent(service);

    component.todo = 'New Task';
    component.onSubmit();

    expect(service.addTodo).toHaveBeenCalledWith('New Task');

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(4);
  });
});
