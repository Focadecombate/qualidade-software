import { idGenerator } from "../src/id-generator";
import { ToDo } from "../src/todo-model";
import { TodoService } from "../src/todo-service";

describe("Todo Service", () => {
  describe("addToDo", () => {
    it("should add a todo", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      expect(toDos.length).toEqual(1);
      expect(toDos[0]).toBeDefined();
      expect(toDos[0].id).toEqual(1);
      expect(toDos[0].name).toEqual("Test");
      expect(toDos[0].done).toEqual(false);
      expect(toDos[0].createdAt).toBeDefined();
      expect(toDos[0].dueDate).toBeDefined();
    });

    it("should not add a todo with the same name", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      expect(toDos.length).toEqual(1);
    });
  });

  describe("getToDos", () => {
    it("should return all todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date(),
      });

      expect(todoService.getToDos().length).toEqual(2);
    });

    it("should return an empty array if there are no todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      expect(todoService.getToDos().length).toEqual(0);
    });
  });

  describe("getToDoById", () => {
    it("should return a todo by id", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      const todo = todoService.getToDoById(1);

      expect(todo).toBeDefined();
      expect(todo?.id).toEqual(1);
      expect(todo?.name).toEqual("Test");
      expect(todo?.done).toEqual(false);
      expect(todo?.createdAt).toBeDefined();
      expect(todo?.dueDate).toBeDefined();
    });

    it("should return undefined if todo does not exist", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      const todo = todoService.getToDoById(1);

      expect(todo).toBeUndefined();
    });
  });

  describe("getToDosByDate", () => {
    it("should return todos by date", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date("2021-01-01"),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date("2021-01-01"),
      });

      todoService.addToDo({
        name: "Test 3",
        dueDate: new Date("2021-01-02"),
      });

      const todos = todoService.getToDosByDate(new Date("2021-01-01"));

      expect(todos.length).toEqual(2);
    });

    it("should return an empty array if there are no todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      const todos = todoService.getToDosByDate(new Date("2021-01-01"));

      expect(todos.length).toEqual(0);
    });
  });

  describe("getToDosByDateRange", () => {
    it("should return todos by date range", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date("2021-01-01"),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date("2021-01-01"),
      });

      todoService.addToDo({
        name: "Test 3",
        dueDate: new Date("2021-01-02"),
      });

      todoService.addToDo({
        name: "Test 4",
        dueDate: new Date("2021-01-05"),
      });

      const todos = todoService.getToDosByDateRange(
        new Date("2021-01-01"),
        new Date("2021-01-02")
      );

      expect(todos.length).toEqual(3);
    });

    it("should return an empty array if there are no todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      const todos = todoService.getToDosByDateRange(
        new Date("2021-01-01"),
        new Date("2021-01-02")
      );

      expect(todos.length).toEqual(0);
    });
  });

  describe("updateToDoById", () => {
    it("should update a todo by id", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.updateToDoById({
        id: 1,
        name: "Test 2",
      });

      const todo = todoService.getToDoById(1);

      expect(todo).toBeDefined();
      expect(todo?.id).toEqual(1);
      expect(todo?.name).toEqual("Test 2");
      expect(todo?.done).toEqual(false);
      expect(todo?.createdAt).toBeDefined();
      expect(todo?.dueDate).toBeDefined();
    });

    it("should not update a todo if it does not exist", () => {
      const toDos: ToDo[] = [];

      const id = idGenerator().next().value as number;

      const todoService = new TodoService(toDos, idGenerator());

      todoService.updateToDoById({
        id,
        name: "Test 2",
      });

      const todo = todoService.getToDoById(1);

      expect(todo).toBeUndefined();
    });
  });

  describe("deleteToDoById", () => {
    it("should delete a todo by id", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.deleteToDoById(1);

      const todo = todoService.getToDoById(1);

      expect(todo).toBeUndefined();
    });

    it("should not delete a todo if it does not exist", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.deleteToDoById(1);

      const todo = todoService.getToDoById(1);

      expect(todo).toBeUndefined();
    });
  });

  describe("toggleToDoById", () => {
    it("should toggle a todo by id", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.toggleToDoById(1);

      const todo = todoService.getToDoById(1);

      expect(todo).toBeDefined();
      expect(todo?.id).toEqual(1);
      expect(todo?.name).toEqual("Test");
      expect(todo?.done).toEqual(true);
      expect(todo?.createdAt).toBeDefined();
      expect(todo?.dueDate).toBeDefined();
    });

    it("should not toggle a todo if it does not exist", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.toggleToDoById(1);

      const todo = todoService.getToDoById(1);

      expect(todo).toBeUndefined();
    });

    it("should toggle a todo back to false", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.toggleToDoById(1);
      todoService.toggleToDoById(1);

      const todo = todoService.getToDoById(1);

      expect(todo).toBeDefined();
      expect(todo?.id).toEqual(1);
      expect(todo?.name).toEqual("Test");
      expect(todo?.done).toEqual(false);
      expect(todo?.createdAt).toBeDefined();
      expect(todo?.dueDate).toBeDefined();
    });
  });

  describe("deleteAllToDos", () => {
    it("should delete all todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date(),
      });

      todoService.deleteAllToDos();

      expect(todoService.getToDos().length).toEqual(0);
    });
  });

  describe("toggleAllToDos", () => {
    it("should toggle all todos", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date(),
      });

      todoService.toggleAllToDos();

      expect(todoService.getToDos()[0].done).toEqual(true);
      expect(todoService.getToDos()[1].done).toEqual(true);
    });

    it("should toggle all todos back to false", () => {
      const toDos: ToDo[] = [];
      const todoService = new TodoService(toDos, idGenerator());

      todoService.addToDo({
        name: "Test",
        dueDate: new Date(),
      });

      todoService.addToDo({
        name: "Test 2",
        dueDate: new Date(),
      });

      todoService.toggleAllToDos();
      todoService.toggleAllToDos();

      expect(todoService.getToDos()[0].done).toEqual(false);
      expect(todoService.getToDos()[1].done).toEqual(false);
    });
  });
});
