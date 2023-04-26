import {
  action,
  autorun,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
} from "mobx";
import { createContext, useContext } from "react";
import { v4 } from "uuid";
import { incodeFile, toBlob } from "../lib/base64Incode";
import { Step } from "./Step";
import { Store } from "./Store";

// abstract class StoreItem {
//   done: boolean;
//   constructor(public id: string) {
//     this.id = v4();
//     this.done = false;
//   }
// }

// abstract class Store<T extends StoreItem> {
//   public list: T[];
//   public id: string;
//   public currentItemId: string | null;
//   constructor(public title: string, public desc: string) {
//     makeObservable(this, {
//       title: observable,
//       desc: observable,
//       list: observable,
//       id: observable,
//       currentItemId: observable,
//       setCurrentItemId: action,
//       // getCurrentItem: action,
//       createItem: action,
//       createNewItem: action,
//       deleteItem: action,
//       Progress: computed,
//       allItemCount: computed,
//       completedItemCount: computed,
//     });
//     this.title = title;
//     this.desc = desc;
//     this.list = [];
//     this.id = v4();
//     this.currentItemId = null;
//   }

//   abstract createNewItem(title: string, desc: string, priority?: number): T;

//   setCurrentItemId = (id: string) => {
//     this.currentItemId = id;
//   };

//   getCurrentItem = (): T | undefined => {
//     return this.list.find((item) => item.id === this.currentItemId);
//   };

//   get completedItemCount(): number {
//     return this.list.filter((item) => item.done).length;
//   }

//   // Define a getter called allItemCount with the type of number
//   get allItemCount(): number {
//     return this.list.length;
//   }

//   get Progress(): number {
//     if (this.completedItemCount == 0 || this.allItemCount == 0) return 0;
//     return Math.floor((this.completedItemCount / this.allItemCount) * 100);
//   }

//   createItem = (
//     title: string,
//     description: string,
//     priority?: number
//   ): void => {
//     const newItem = this.createNewItem(title, description, priority);
//     this.list.push(newItem);
//   };

//   deleteItem = (id: string): void => {
//     const index = this.list.findIndex((item) => item.id === id);
//     this.list.splice(index, 1);
//   };
// }

// export class ProjectStore {
//   ProjectList: Project[] = []; // Array of projects
//   currentProjectId: string | undefined;

//   constructor() {
//     makeAutoObservable(this);
//     this.currentProjectId = undefined;
//     this.loadFromStorage();
//     autorun(() => {
//       localStorage.setItem("ProjectList", JSON.stringify(this.ProjectList));
//     });
//     autorun(async () => {
//       const imageMap = new Map();

//       await Promise.all(
//         this.ProjectList.map(async (project) => {
//           if (project.thumbNailFile) {
//             const base64String = await incodeFile(project.thumbNailFile);
//             if (base64String) imageMap.set(project.id, base64String);
//           }
//         })
//       );

//       const myMapArray = Array.from(imageMap.entries());
//       const serializedMap = JSON.stringify(myMapArray);

//       localStorage.setItem("projectThumbnail", serializedMap);
//     });
//     autorun(() => {
//       localStorage.setItem(
//         "currentProjectId",
//         JSON.stringify(this.currentProjectId)
//       );
//     });
//   }

//   loadFromStorage() {
//     const storedProjects = localStorage.getItem("ProjectList");
//     if (!storedProjects) return;

//     const parsedList: Project[] = JSON.parse(storedProjects);
//     const serializedMap = localStorage.getItem("projectThumbnail");
//     const myMap = serializedMap
//       ? new Map(JSON.parse(serializedMap))
//       : new Map();

//     const newArr = parsedList.map((projectLikeObject) => {
//       const { title, desc, list, id } = projectLikeObject;
//       const blob = myMap.get(id) ? toBlob(myMap.get(id) as string) : undefined;
//       const newProject = new Project(title, desc, blob);
//       newProject.id = id;
//       newProject.list = list;
//       return newProject;
//     });
//     this.ProjectList = newArr;

//     const id = localStorage.getItem("currentProjectId");
//     if (!id) return;
//     this.currentProjectId = JSON.parse(id);
//   }

//   setCurrentProject = (id: string): void => {
//     this.currentProjectId = id;
//   };

//   getCurrentProject = (): Project | undefined => {
//     return this.ProjectList.find(
//       (project) => project.id === this.currentProjectId
//     );
//   };

//   createProject = (
//     title: string,
//     description: string,
//     file: Blob | undefined
//   ): void => {
//     this.ProjectList.push(new Project(title, description, file));
//   };

//   deleteProject = (project: Project): void => {
//     const index = this.ProjectList.indexOf(project);
//     if (index !== -1) {
//       this.ProjectList.splice(index, 1);
//     }
//   };

//   updateProject = (
//     project: Project,
//     title: string,
//     description: string
//   ): void => {
//     project.title = title;
//     project.desc = description;
//   };
// }

// export class Project extends Store<Todo> {
//   thumbNailFile: Blob | undefined;
//   constructor(title: string, desc: string, thumbNailFile: Blob | undefined) {
//     super(title, desc);
//     makeObservable(this, {
//       thumbNailFile: observable,
//     });
//     this.thumbNailFile = thumbNailFile;
//   }
//   createNewItem(title: string, desc: string): Todo {
//     return new Todo(title, desc);
//   }

//   changeThumbnail = (file: Blob) => {
//     this.thumbNailFile = file;
//   };
// }

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
  // 만약에 list item이 없을경우에는. this.done은 observable인데..
  // list item이 없을 경우에는 ㅇㄹㅇㄹㄴㅇㄹㅇ

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

// export class Step {
//   id: string;
//   done: boolean;
//   priority: number;
//   desc: string;
//   constructor(public title: string, desc: string, priority: number) {
//     makeAutoObservable(this);
//     this.title = title;
//     this.id = v4();
//     this.done = false;
//     this.priority = priority;
//     this.desc = desc;
//   }

//   toggleStep = () => {
//     this.done = !this.done;
//   };
// }

/*
이때 project의 구조는
{
  method.
  property.
  getter
  setter
}
이렇게 되어있는데.
이 [{Project},{Project}].가 serialize될때. method는 전부 null이 되어버린다.
그럼 어떻게? Store에서 toJSON을 통해서. 각각의 Project들을 toJson()해야함.



*/

// const ProjectStoreContext = createContext<ProjectStore | null>(null);

// export const ProjectStoreProvider = ({
//   children,
// }: {
//   children: JSX.Element;
// }) => {
//   return (
//     <ProjectStoreContext.Provider value={new ProjectStore()}>
//       {children}
//     </ProjectStoreContext.Provider>
//   );
// };

// export const useTodoStore = () => useContext(ProjectStoreContext);

// export const useCurrentProject = () =>
//   useContext(ProjectStoreContext)?.getCurrentProject();

// export const useCurrentProjectTodos = (): undefined | Todo => undefined;
// useContext(ProjectStoreContext)?.CurrentProject?.getCurrentItem();

// store instance를 불러와서.

// 걔의 currentProject 함수를 통해서
// currentProject를 불러오고.
// 걔의 setTodo함수를 통해서 set하고
// set 된것을 함수 호출해야하는데.
