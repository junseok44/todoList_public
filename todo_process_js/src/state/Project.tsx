import { action, makeObservable, observable } from "mobx";
import { Todo } from "./Todo";
import { Store } from "./ProjectStore";

export class Project extends Store<Todo> {
  thumbNailFile: Blob | undefined;
  constructor(title: string, desc: string, thumbNailFile: Blob | undefined) {
    super(title, desc);
    makeObservable(this, {
      thumbNailFile: observable,
      changeThumbnail: action,
      changeData: action,
    });
    this.thumbNailFile = thumbNailFile;
  }
  createNewItem(title: string, desc: string): Todo {
    return new Todo(title, desc);
  }

  changeThumbnail = (file: Blob) => {
    this.thumbNailFile = file;
  };

  changeData = (title?: string, desc?: string) => {
    if (title) this.title = title;
    if (desc) this.desc = desc;
  };
}
