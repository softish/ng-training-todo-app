import { TestBed, inject } from '@angular/core/testing';

import { InMemoryTodoService } from './in-memory-todo.service';
import { Todo } from '../model/todo';

describe('InMemoryTodoService', () => {
  let service: InMemoryTodoService;

  beforeEach(() => {
      service = new InMemoryTodoService();
  });

  it('should should have three todos after construction', () => {
    expect(service.todos.length).toBe(3);

    expect(service.todos).toContain(new Todo(0, 'Todo 1', false));
    expect(service.todos).toContain(new Todo(1, 'Todo 2', false));
    expect(service.todos).toContain(new Todo(2, 'Todo 3', false));
  });

  it('should return todos' , () => {
    service.todos.push(new Todo(3, 'A new todo', false));

    expect(service.getTodos().length).toBe(4);
    expect(service.getTodos()).toContain(new Todo(3, 'A new todo', false));
  });

  it('should add new todo at the end of todos', () => {
    service.addTodo('A new Todo');
    expect(service.getTodos().length).toBe(4);
    expect(service.getTodos()[3]).toEqual(new Todo(3, 'A new Todo', false));
  });

  it('should delete todo based on index passed', () => {
    service.deleteTodo(1);

    expect(service.getTodos().length).toBe(2);
    expect(service.getTodos()).not.toContain(new Todo(1, 'Todo 2', false));
  });

  it('should update the todo to mark it as done', () => {
    service.updateDone(1, true);

    expect(service.getTodos()[1].isDone).toBeTruthy();
  });

  it('should update the todo to mark it as not done', () => {
    service.todos[1].isDone = true;

    service.updateDone(1, false);

    expect(service.getTodos()[1].isDone).toBeFalsy();
  });

  it('should rename the todo', () => {
    service.updateName(1, 'Updated task');

    expect(service.getTodos()[1].name).toBe('Updated task');
  });
});
