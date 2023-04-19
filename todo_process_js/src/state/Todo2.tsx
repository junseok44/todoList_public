import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

abstract class StoreItem {
  done: boolean;
  constructor(public id: string) {
    this.id = v4();
    this.done = false;
  }
}

abstract class Store<T extends StoreItem> {
  public list: T[];
  public id: string;
  public currentItemId: string | null;
  constructor(public title: string, public desc: string) {
    makeAutoObservable(this);
    this.title = title;
    this.desc = desc;
    this.list = [];
    this.id = v4();
    this.currentItemId = null;
  }

  abstract createNewItem(title: string, desc: string): T;

  setCurrentItemId = (id: string) => {
    this.currentItemId = id;
  };

  getCurrentItem = (id: string) => {
    return this.list.find((item) => item.id === id);
  };

  get completedItemCount(): number {
    return this.list.filter((item) => item.done).length;
  }

  // Define a getter called allItemCount with the type of number
  get allItemCount(): number {
    return this.list.length;
  }

  get Progress(): number {
    if (this.completedItemCount == 0 || this.allItemCount == 0) return 0;
    return Math.floor((this.completedItemCount / this.allItemCount) * 100);
  }

  createItem = (title: string, description: string): void => {
    const newItem = this.createNewItem(title, description);
    this.list.push(newItem);
  };

  deleteItem = (id: string): void => {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  };
}

class Project extends Store<Todo> {
  thumbNailSrc: string | null;
  constructor(title: string, desc: string) {
    super(title, desc);
    this.thumbNailSrc = null;
  }
  createNewItem(title: string, desc: string): Todo {
    return new Todo(title, desc);
  }
}

class Todo extends Store<Step> {
  done: boolean;
  constructor(title: string, desc: string) {
    super(title, desc);
    this.done = false;
  }
  createNewItem(title: string): Step {
    return new Step(title);
  }
}

class Step {
  id: string;
  done: boolean;
  priority: number;
  constructor(public title: string) {
    this.title = title;
    this.id = v4();
    this.done = false;
    this.priority = 1;
  }
}
