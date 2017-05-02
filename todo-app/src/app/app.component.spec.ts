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

   it('should show not input box for inplace edit by default', fakeAsync(() => {
     let form = this.fixture.debugElement.queryAll(By.css('.edit-todo-form'))[0];
     expect(form).toBeFalsy();
   }));

   it('should show hide span for inplace edit when clicked', fakeAsync(() => {
     let span = this.fixture.debugElement.queryAll(By.css('.todo'))[0];

     span.triggerEventHandler('click', null);

     this.fixture.detectChanges();
     tick();

     let allSpans = this.fixture.debugElement.queryAll(By.css('.todo'));
     expect(allSpans.length).toBe(2);

     allSpans.forEach(eachSpan => {
         expect(eachSpan.nativeElement.value).not.toBe('Todo 1');
     });
   }));

    it('should show input box with task name for inplace edit when span is clicked', fakeAsync(() => {

      let span = this.fixture.debugElement.queryAll(By.css('.todo'))[0];

      span.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let form = this.fixture.debugElement.queryAll(By.css('.edit-todo-form'))[0];
      expect(form.query(By.css('.input-todo')).nativeElement.value).toBe('Todo 1');
    }));

    it('should hide inplace edit input box and show span with task name input box loses focus/blurs', fakeAsync(() => {

      let span = this.fixture.debugElement.queryAll(By.css('.todo'))[0];

      span.triggerEventHandler('click', null);

      this.fixture.detectChanges();
      tick();

      let form = this.fixture.debugElement.queryAll(By.css('.edit-todo-form'))[0];

      form.query(By.css('.input-todo')).nativeElement.focus = true;

      form.query(By.css('.input-todo')).triggerEventHandler('blur', null);
      this.fixture.detectChanges();
      tick();

      expect(this.fixture.debugElement.queryAll(By.css('.todo'))[0].nativeElement.innerText).toBe('Todo 1');
    }));
});
