import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {InMemoryTodoService } from './service/in-memory-todo.service';
import {TodoComponent} from './component/todo/todo.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';

@NgModule({
  declarations: [
    TodoComponent,
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
