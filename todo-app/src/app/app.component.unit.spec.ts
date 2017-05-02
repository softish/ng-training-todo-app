import { Component } from '@angular/core';
import { AppComponent, Todo } from './app.component';

describe('AppComponentUnit', () => {
  let component: AppComponent;

  beforeEach(() => {
      component = new AppComponent();
  });

  it(`should have a title with value 'todo app works!'`, () => {
    expect(component.title).toEqual('todo app works!');
  });

  it('should contain todos after creation', () => {
    expect(component.todos.length).toBe(3);
    expect(component.todos[0]).toEqual(new Todo('Todo 1', false));
    expect(component.todos[1]).toEqual(new Todo('Todo 2', false));
    expect(component.todos[2]).toEqual(new Todo('Todo 3', false));
  });

  it('should add new todo at the end of the todo list', () => {
    component.todo = 'New Task';

    component.onSubmit();

    expect(component.todos.length).toBe(4);
    expect(component.todos[3]).toEqual(new Todo('New Task', false));
  });

  it('should remove todo based on index', () => {
    component.delete(1);

    expect(component.todos.length).toBe(2);
    expect(component.todos[0]).toEqual(new Todo('Todo 1', false));
    expect(component.todos[1]).toEqual(new Todo('Todo 3', false));
  });

  it('should mark a todo as done if not done', () => {
    component.toggleDone(1);

    expect(component.todos[1].isDone).toBe(true);
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
    component.enableEditing(1);

    expect(component.editingEnabled[1]).toBeTruthy();
  });
});
