export class Todo {
  id: number;
  name: string;
  isDone = false;

  constructor (id: number, name: string, isDone: boolean) {
    this.id = id;
    this.name = name;
    this.isDone = isDone;
  }
}
