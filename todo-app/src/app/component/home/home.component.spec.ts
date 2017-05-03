import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {TodoComponent} from '../../component/todo/todo.component';
import {HomeComponent} from '../../component/home/home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let wrapper: AppComponentTestWrapper;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        TodoComponent,
        HomeComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    this.fixture = TestBed.createComponent(HomeComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
    this.wrapper = new AppComponentTestWrapper(this.fixture);
  }));

  it('should render todos', () => {
    let elements: DebugElement[] = this.wrapper.getTodoSpans();
    expect(elements.length).toBe(3);
    expect(elements[0].nativeElement.innerText).toBe('Todo 1');
    expect(elements[1].nativeElement.innerText).toBe('Todo 2');
    expect(elements[2].nativeElement.innerText).toBe('Todo 3');
  });

   it('should be able to add a new todo', fakeAsync(() => {

      let taskInput = this.wrapper.getNewTodo();
      this.wrapper.setNewTodoValue('New Task');

      let form = this.wrapper.getTodoForm();
      this.wrapper.submitForm(form);

      let elements: DebugElement[] = this.wrapper.getTodoSpans();
      expect(elements.length).toBe(4);
      expect(elements[3].nativeElement.innerText).toBe('New Task');
    }));

    it('should reset todo input value after form is submitted', fakeAsync(() => {

      this.wrapper.setNewTodoValue('New Todo');

      let form = this.wrapper.getTodoForm();
      this.wrapper.submitForm(form);

      expect(this.wrapper.getNewTodo().value).toBe('');
    }));

    it('should remove todo when delete button is clicked', fakeAsync(() => {

      let deleteButton = this.wrapper.getDeleteButtons()[1];

      this.wrapper.clickElement(deleteButton);

      let todos: DebugElement[] = this.wrapper.getTodoSpans();
      expect(todos.length).toBe(2);
      expect(todos[0].nativeElement.innerText).toBe('Todo 1');
      expect(todos[1].nativeElement.innerText).toBe('Todo 3');
    }));

    it('should check the done checkbox and mark the task done when clicked', fakeAsync(() => {
      let doneButton = this.wrapper.getDoneButtons()[1];

      this.wrapper.clickElement(doneButton);

      expect(doneButton.nativeElement.checked).toBe(true);
      // This is a redundunt check as we already have this check in unit test.
      // So we can also use spy here and check that the html is calling component correcly
      // So effectively we will be testing the binding between view and logic
      expect(this.component.todos[1].isDone).toBe(true);

    }));

    it('should apply task done css when task is marked as done', fakeAsync(() => {
      let doneButton = this.wrapper.getDoneButtons()[1];
      this.wrapper.clickElement(doneButton);

      let todo = this.wrapper.getTodoSpans()[1];

      expect(this.wrapper.hasDoneClass(todo)).toBeTruthy();
    }));

    it('should remove task done css when task is marked as undone', fakeAsync(() => {
      let doneButton = this.wrapper.getDoneButtons()[1];

      this.wrapper.clickElement(doneButton);

      this.wrapper.clickElement(doneButton);

      let todo: DebugElement = this.wrapper.getTodoSpans()[1];
      expect(this.wrapper.hasDoneClass(todo)).toBeFalsy();
    }));

   it('should not show input box for inplace edit by default', fakeAsync(() => {
     let forms = this.wrapper.getEditableTodoForms();
     expect(forms.length).toBe(0);
   }));

   it('should hide span for inplace edit when clicked', fakeAsync(() => {
     let span = this.wrapper.getTodoSpans()[0];

     this.wrapper.clickElement(span);

     let allSpans = this.wrapper.getTodoSpans();

     expect(allSpans.length).toBe(2);
     allSpans.forEach(eachSpan => {
         expect(eachSpan.nativeElement.value).not.toBe('Todo 1');
     });
   }));

    it('should show input box with task name for inplace edit when span is clicked', fakeAsync(() => {

      this.wrapper.setNewTodoValue('New Todo');

      let form = this.wrapper.getTodoForm();
      this.wrapper.submitForm(form);

      let span = this.wrapper.getTodoSpans()[3];

      this.wrapper.clickElement(span);

      let editableForm = this.wrapper.getEditableTodoForms()[0];

      expect(this.wrapper.getEditableTodoInput(editableForm).nativeElement.value).toBe('New Todo');
    }));

    it('should hide inplace edit input box and show span with task name input box loses focus/blurs', fakeAsync(() => {
      let span = this.wrapper.getTodoSpans()[0];

      this.wrapper.clickElement(span);

      let form = this.wrapper.getEditableTodoForms()[0];

      this.wrapper.blurEditableTodoInput(form);

      expect(this.wrapper.getTodoSpans()[0].nativeElement.innerText).toBe('Todo 1');
    }));

    it('should update the task name span with the updated value of task when in place edit is submitted', fakeAsync(() => {
      let span = this.wrapper.getTodoSpans()[0];

      this.wrapper.clickElement(span);

      let form = this.wrapper.getEditableTodoForms()[0];

      this.wrapper.setEditableTodoInputValue(0, 'Updated task');

      this.wrapper.submitForm(form);

      expect(this.wrapper.getTodoSpans()[0].nativeElement.innerText).toBe('Updated task');
    }));

    class AppComponentTestWrapper {
      constructor(private fixture:  ComponentFixture<HomeComponent>) {
      }

      getTodoSpans(): DebugElement[] {
          return this.fixture.debugElement.queryAll(By.css('.todo'));
      }

      clickElement(button: DebugElement) {
        button.triggerEventHandler('click', null);
        this.fixture.detectChanges();
        tick();
      }

      blurEditableTodoInput(form: DebugElement) {
        form.query(By.css('.input-todo')).triggerEventHandler('blur', null);
        this.fixture.detectChanges();
        tick();
      }

      getEditableTodoForms() : DebugElement[] {
        return this.fixture.debugElement.queryAll(By.css('.edit-todo-form'));
      }

      getEditableTodoInput(form: DebugElement) : DebugElement {
        return form.query(By.css('.input-todo'));
      }

      setEditableTodoInputValue(index: number, value: string) {
        let input = this.getEditableTodoInput(this.getEditableTodoForms()[index]);
        input.nativeElement.value = value;
        input.nativeElement.dispatchEvent(new Event('input'));

        this.fixture.detectChanges();
        tick();
      }

      getDoneButtons() : DebugElement[] {
        return this.fixture.debugElement.queryAll(By.css('.btn-done'));
      }

      hasDoneClass(todo : DebugElement) : boolean {
        return todo.classes['todo-done'];
      }

      getDeleteButtons() : DebugElement[] {
        return this.fixture.debugElement.queryAll(By.css('.btn-delete'));
      }

      getNewTodo() : any {
        let compiled = this.fixture.debugElement.nativeElement;
        return compiled.querySelector('#todo-form > input');
      }

      setNewTodoValue(value : string) {
        let taskInput = this.getNewTodo();
        taskInput.value = value;
        taskInput.dispatchEvent(new Event('input'));

        this.fixture.detectChanges();
        tick();
      }

      getTodoForm() : DebugElement {
        return this.fixture.debugElement.query(By.css('#todo-form'));
      }

      submitForm(form: DebugElement) {
        form.triggerEventHandler('submit', null);

        this.fixture.detectChanges();
        tick();
      }
    }
});
