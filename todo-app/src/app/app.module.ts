import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import {InMemoryTodoService } from './service/in-memory-todo.service';
import {TodoComponent} from './component/todo/todo.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { SearchComponent } from './component/search/search.component';

const routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: SearchComponent}
];

@NgModule({
  declarations: [
    TodoComponent,
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [InMemoryTodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
