import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {HomeComponent} from './component/home/home.component';
import {TodoComponent} from './component/todo/todo.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
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

  it('should render title in a h1 tag',() => {
    const compiled = this.fixture.nativeElement;
    expect(compiled.querySelector('h1').innerText).toContain(this.component.title);
  });
});
