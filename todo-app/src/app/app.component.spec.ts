import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { TodoComponent } from './component/todo/todo.component';
import { InMemoryTodoService } from './service/in-memory-todo.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [InMemoryTodoService],
      declarations: [
        TodoComponent,
        HomeComponent,
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    this.fixture = TestBed.createComponent(AppComponent);
    this.component = this.fixture.componentInstance;
    this.fixture.detectChanges();
  }));

  it('should render title in navbar brand', () => {
    expect(this.fixture.debugElement.query(By.css('.navbar-brand')).nativeElement.innerText).toContain(this.component.title);
  });

  it('should display router outlet', () => {
    console.log(this.fixture.debugElement);
    expect(this.fixture.debugElement.query(By.directive(RouterOutlet))).not.toBeNull();
  });
});
