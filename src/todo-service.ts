import { ToDo } from "./todo-model";
import { idGenerator } from "./id-generator";

interface CreateToDo {
  name: string;
  dueDate: Date;
}

interface UpdateToDoById extends Partial<CreateToDo> {
  id: number;
}

export class TodoService {
  constructor(
    private readonly toDos: ToDo[],
    private readonly getId: Generator<number, void, unknown>
  ) {}

  public getToDos(): ToDo[] {
    return this.toDos;
  }

  public getToDoById(id: number): ToDo | undefined {
    return this.toDos.find((toDo) => toDo.id === id);
  }

  public getToDosByDate(date: Date): ToDo[] {
    return this.toDos.filter(
      (toDo) => toDo.dueDate.toDateString() === date.toDateString()
    );
  }

  public getToDosByDateRange(startDate: Date, endDate: Date): ToDo[] {
    return this.toDos.filter(
      (toDo) => toDo.dueDate >= startDate && toDo.dueDate <= endDate
    );
  }

  public getDoneToDos(): ToDo[] {
    return this.toDos.filter((toDo) => toDo.done);
  }

  public addToDo({ dueDate, name }: CreateToDo): void {
    const todoAlreadyExists = this.toDos.some((toDo) => toDo.name === name);

    if (todoAlreadyExists) {
      return;
    }

    const id = this.getId.next().value ?? 0;

    this.toDos.push({
      id,
      name,
      done: false,
      createdAt: new Date(),
      dueDate,
    });
  }

  public updateToDoById({ id, dueDate, name }: UpdateToDoById) {
    const toDo = this.getToDoById(id);

    if (!toDo) {
      return;
    }

    const index = this.toDos.indexOf(toDo);

    if (toDo) {
      toDo.dueDate = dueDate ?? toDo.dueDate;
      toDo.name = name ?? toDo.name;
    }

    this.toDos[index] = toDo;
  }

  public deleteToDoById(id: number): void {
    const toDo = this.getToDoById(id);

    if (!toDo) {
      return;
    }

    const index = this.toDos.indexOf(toDo);

    this.toDos.splice(index, 1);
  }

  public deleteAllToDos(): void {
    this.toDos.splice(0, this.toDos.length);
  }

  public toggleToDoById(id: number): void {
    const toDo = this.getToDoById(id);

    if (!toDo) {
      return;
    }

    const index = this.toDos.indexOf(toDo);

    toDo.done = !toDo.done;

    this.toDos[index] = toDo;
  }

  public toggleAllToDos(): void {
    this.toDos.forEach((toDo, index) => {
      toDo.done = !toDo.done;
      this.toDos[index] = toDo;
    });
  }
}
