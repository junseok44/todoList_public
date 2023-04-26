import { computed, makeObservable, observable } from "mobx";
import { Step } from "./Step";
import { Store } from "./Store";

export class Todo extends Store<Step> {
  public _done: boolean = false;
  constructor(title: string, desc: string) {
    super(title, desc);
    makeObservable(this, {
      done: computed,
      _done: observable,
    });
  }
  createNewItem(title: string, desc: string, priority: number): Step {
    return new Step(title, desc, priority);
  }

  clearAllSteps = () => {
    this.list.forEach((step) => (step.done = true));
  };

  get done() {
    if (this.list.length == 0) {
      return this._done;
    }
    const checkAllDone = (list: { done: boolean }[]): boolean => {
      // Check if the list is empty
      if (list.length === 0) {
        return false;
      }
      // Loop through the list
      for (let i = 0; i < list.length; i++) {
        // If any item has done property as false, return false
        if (!list[i].done) {
          return false;
        }
      }
      // If all items have done property as true, return true
      return true;
    };
    return checkAllDone(this.list);
  }

  set done(value: boolean) {
    this._done = value;
  }
}
