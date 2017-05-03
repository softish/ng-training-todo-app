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

  it('should call service to fetch todos and assign them in constructor', () => {
    spyOn(service, 'getTodos').and.callThrough();

    component = new AppComponent(service);

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos).not.toBeNull();
  });

  it('should call service to add new todo and fetches all the todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'addTodo').and.callThrough();

    component = new AppComponent(service);

    component.todo = 'New Task';
    component.onSubmit();

    expect(service.addTodo).toHaveBeenCalledWith(new Todo('New Task', false));

    expect(service.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(4);
  });

  it('should call service to remove todo based on index and fetches all todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'deleteTodo').and.callThrough();

    component = new AppComponent(service);

    component.delete(1);

    expect(service.deleteTodo).toHaveBeenCalledWith(1);
    expect(service.getTodos).toHaveBeenCalled();

    expect(component.todos.length).toBe(2);
  });

  it('should call service to mark a todo as done and fetches all todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'updateDone').and.callThrough();

    component.toggleDone(1);

    expect(service.updateDone).toHaveBeenCalledWith(1, true);
    expect(service.getTodos).toHaveBeenCalled();

    expect(component.todos.length).toBe(3);
  });

  it('should call service to mark a todo as not done and fetches all todos from service again', () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'updateDone').and.callThrough();

    component.toggleDone(1);
    component.toggleDone(1);

    expect(service.updateDone).toHaveBeenCalledWith(1, false);
    expect(service.getTodos).toHaveBeenCalled();

    expect(component.todos.length).toBe(3);
  });

  it('should mark a todo as undone if marked as done', () => {
    component.toggleDone(1);

    component.toggleDone(1);

    expect(component.todos[1].isDone).toBe(false);
  });

  it('should have default value of enable editing as false after calling constructor', () => {
      for (let editable of component.editingEnabled) {
        expect(editable).toBeFalsy();
      }
  });

  it('should set enable editing property to true when enableEditing is called', () => {
    component.todo = 'New Task';
    component.onSubmit();

    component.enableEditing(3);

    expect(component.editingEnabled[3]).toBeTruthy();
  });

  it('should set disable editing property to false when disableEditing is called', ()=> {
    component.todo = 'New Task';
    component.onSubmit();

    component.enableEditing(3);

    component.disableEditing(3);

    expect(component.editingEnabled[3]).toBeFalsy();
  });

  it('should call the service to rename todo and fetch all todos again', () => {
    spyOn(service, 'updateName').and.callThrough();
    spyOn(service, 'getTodos').and.callThrough();

    component = new AppComponent(service);
    component.renameTodo(1, 'Updated task');

    expect(service.updateName).toHaveBeenCalledWith(1, 'Updated task');
    expect(service.getTodos).toHaveBeenCalled();
  });
});
