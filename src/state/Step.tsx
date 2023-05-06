import { makeAutoObservable } from "mobx";
import { v4 } from "uuid";

export class Step {
  id: string;
  done: boolean;
  priority: number;
  desc: string;
  forToday: boolean;
  onProgress: boolean;
  constructor(public title: string, desc: string, priority: number) {
    makeAutoObservable(this);
    this.title = title;
    this.id = v4();
    this.done = false;
    this.priority = priority;
    this.desc = desc;
    this.onProgress = false;
    this.forToday = false;
  }
}
