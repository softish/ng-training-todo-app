import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    this.fixture = TestBed.createComponent(AppComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  }));

  it('should render title in a h1 tag',() => {
    const compiled = this.fixture.nativeElement;
    expect(compiled.querySelector('h1').innerText).toContain(this.component.title);
  });

  it('should render todos', () => {
    let elements: DebugElement[] = this.fixture.debugElement.queryAll(By.css('.todo'));
    expect(elements.length).toBe(3);
    expect(elements[0].nativeElement.innerText).toBe('Todo 1');
    expect(elements[1].nativeElement.innerText).toBe('Todo 2');
    expect(elements[2].nativeElement.innerText).toBe('Todo 3');
  });

   it('should be able to add a new todo', fakeAsync(() => {

      let compiled = this.fixture.debugElement.nativeElement;
      let taskInput = compiled.querySelector('#todo-form > input');

      taskInput.value = 'New Task';
      taskInput.dispatchEvent(new Event('input'));

      this.fixture.detectChanges();
      tick();

      let form = this.fixture.debugElement.query(By.css('#todo-form'));
      form.triggerEventHandler('submit', null);

      this.fixture.detectChanges();
      tick();

      let elements: DebugElement[] = this.fixture.debugElement.queryAll(By.css('.todo'));
      expect(elements.length).toBe(4);
      expect(elements[3].nativeElement.innerText).toBe('New Task');
    }));

    it('should reset todo input value after form is submitted', fakeAsync(() => {

      let compiled = this.fixture.debugElement.nativeElement;
      let taskInput = compiled.querySelector('#todo-form > input');

      taskInput.value = 'New Task';
      taskInput.dispatchEvent(new Event('input'));

      this.fixture.detectChanges();
      tick();

      let form = this.fixture.debugElement.query(By.css('#todo-form'));
      form.triggerEventHandler('submit', null);

      this.fixture.detectChanges();
      tick();

      expect(taskInput.value).toBe('');
    }));

    it('should remove todo when delete button is clicked', fakeAsync(() => {

      let deleteButton = this.fixture.debugElement.queryAll(By.css('.btn-delete'))[1];
      deleteButton.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let todos: DebugElement[] = this.fixture.debugElement.queryAll(By.css('.todo'));
      expect(todos.length).toBe(2);
      expect(todos[0].nativeElement.innerText).toBe('Todo 1');
      expect(todos[1].nativeElement.innerText).toBe('Todo 3');
    }));

    it('should check the done checkbox and mark the task done when clicked', fakeAsync(() => {
      let deleteButton = this.fixture.debugElement.queryAll(By.css('.btn-done'))[1];
      deleteButton.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      expect(deleteButton.nativeElement.checked).toBe(true);
      // This is a redundunt check as we already have this check in unit test.
      // So we can also use spy here and check that the html is calling component correcly
      // So effectively we will be testing the binding between view and logic
      expect(this.component.todos[1].isDone).toBe(true);

    }));

    it('should apply task done css when task is marked as done', fakeAsync(() => {
      let deleteButton = this.fixture.debugElement.queryAll(By.css('.btn-done'))[1];
      deleteButton.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let todo: DebugElement = this.fixture.debugElement.queryAll(By.css('.todo'))[1];
      expect(todo.classes['todo-done']).toBeTruthy();
    }));

    it('should remove task done css when task is marked as undone', fakeAsync(() => {
      let deleteButton = this.fixture.debugElement.queryAll(By.css('.btn-done'))[1];
      deleteButton.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      deleteButton.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let todo: DebugElement = this.fixture.debugElement.queryAll(By.css('.todo'))[1];
      expect(todo.classes['todo-done']).toBeFalsy();
    }));

  /*  it('should enabled input when span clicked', fakeAsync(() => {

      let span = this.fixture.debugElement.queryAll(By.css('.todo'))[1];

      span.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let compiled = this.fixture.debugElement.nativeElement;
      let taskInput = compiled.querySelector('.edit-todo-form:first-child');

      expect(taskInput.style('display')).not.toBe('inline');
    })); */
});
