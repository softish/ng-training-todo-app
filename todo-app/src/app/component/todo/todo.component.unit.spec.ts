import { Component } from '@angular/core';
import { Todo } from '../../app.component';
import {TodoComponent} from './todo.component';

import { InMemoryTodoService } from '../../service/in-memory-todo.service';

describe('TodoComponentUnit', () => {
  let component: TodoComponent;
  let service: InMemoryTodoService;
  const ID = 1;
  let todo = new Todo(ID, 'Todo', false);

  beforeEach(() => {
      service = new InMemoryTodoService();
      component = new TodoComponent(service);
  });

  it('should call service to remove todo based on index and raises deleted event', (done) => {
    spyOn(service, 'deleteTodo').and.callThrough();

    component = new TodoComponent(service);
    component.todo = todo;
    component.ngOnInit();

    component.event.asObservable().subscribe((eventData) => {
      expect(eventData).toBe('deleted');
      done();
    });

    component.delete();

    expect(service.deleteTodo).toHaveBeenCalledWith(ID);
  });

  it('should call service to mark a todo as done and raises toggled event', (done) => {
    spyOn(service, 'updateDone').and.callThrough();

    component = new TodoComponent(service);
    component.todo = todo;
    component.ngOnInit();

    component.event.asObservable().subscribe((eventData) => {
      expect(eventData).toBe('toggled');
      done();
    });

    component.toggleDone();

    expect(service.updateDone).toHaveBeenCalledWith(ID, true);
  });

  it('should call service to mark a todo as not done and raise toggled event', (done) => {
    spyOn(service, 'updateDone').and.callThrough();

    component = new TodoComponent(service);
    component.todo = todo;
    component.ngOnInit();

    component.event.asObservable().subscribe((eventData) => {
      expect(eventData).toBe('toggled');
      done();
    });

    component.toggleDone();
    component.toggleDone();

    expect(service.updateDone).toHaveBeenCalledWith(ID, true);
  });

  it('should have default value of enable editing as false after calling constructor', () => {
      expect(component.editingEnabled).toBeFalsy();
  });

  it('should set enable editing property to true when enableEditing is called', () => {
    component.todo = todo;

    component.enableEditing();

    expect(component.editingEnabled).toBeTruthy();
  });


  it('should set disable editing property to false when disableEditing is called', ()=> {
    component.todo = todo;

    component.enableEditing();

    component.disableEditing();

    expect(component.editingEnabled).toBeFalsy();
  });

  it('should call the service to rename todo and raise updated event', (done) => {
    spyOn(service, 'updateName').and.callThrough();

    component = new TodoComponent(service);
    component.todo = todo;
    component.ngOnInit();

    component.event.asObservable().subscribe((eventData) => {
      expect(eventData).toBe('updated');
      done();
    });

    component.renameTodo('Updated task');

    expect(service.updateName).toHaveBeenCalledWith(ID, 'Updated task');
  });
});
