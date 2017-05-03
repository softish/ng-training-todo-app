import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../app.component';
import {InMemoryTodoService} from '../../service/in-memory-todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() event: EventEmitter<string>;
  editingEnabled: boolean = false;
  editedName: string;

  constructor(private service: InMemoryTodoService) {
    this.event = new EventEmitter<string>();
  }

  ngOnInit() {
    this.editedName = this.todo.name;
  }

  delete() {
    this.service.deleteTodo(this.todo.id);
    this.event.emit('deleted');
  }

  toggleDone() {
    this.service.updateDone(this.todo.id, !this.todo.isDone);
    this.event.emit('toggled');
  }

  enableEditing() {
    this.editingEnabled = true;
  }

  disableEditing() {
    this.editingEnabled = false;
    this.editedName = this.todo.name;
  }

  renameTodo(newName: string) {
    this.service.updateName(this.todo.id, newName);
    this.editingEnabled = false;
    this.event.emit('updated');
  }

}
