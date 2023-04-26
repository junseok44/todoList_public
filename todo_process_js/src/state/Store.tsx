import { action, computed, makeObservable, observable } from "mobx";
import { v4 } from "uuid";

abstract class StoreItem {
  done: boolean;
  constructor(public id: string) {
    this.id = v4();
    this.done = false;
  }
}

export abstract class Store<T extends StoreItem> {
  public list: T[];
  public id: string;
  public currentItemId: string | null;
  constructor(public title: string, public desc: string) {
    makeObservable(this, {
      title: observable,
      desc: observable,
      list: observable,
      id: observable,
      currentItemId: observable,
      setCurrentItemId: action,
      createItem: action,
      createNewItem: action,
      // deleteItem: action,
      Progress: computed,
      allItemCount: computed,
      completedItemCount: computed,
    });
    this.title = title;
    this.desc = desc;
    this.list = [];
    this.id = v4();
    this.currentItemId = null;
    this.setCurrentItemId = this.setCurrentItemId.bind(this);
  }

  abstract createNewItem(title: string, desc: string, priority?: number): T;

  // setCurrentItemId = (id: string) => {
  //   this.currentItemId = id;
  // };

  setCurrentItemId(id: string) {
    this.currentItemId = id;
  }

  getCurrentItem = (): T | undefined => {
    return this.list.find((item) => item.id === this.currentItemId);
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

  createItem = (
    title: string,
    description: string,
    priority?: number
  ): void => {
    const newItem = this.createNewItem(title, description, priority);
    this.list.push(newItem);
  };

  deleteItem = (id: string): void => {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  };
}
