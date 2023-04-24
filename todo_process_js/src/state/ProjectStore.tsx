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
import { Project } from "./Project";
import { Todo } from "./Todo";

const parseListLikeObject = <
  T extends {
    title: string;
    desc: string;
    id: string;
    currentItemId: string | null;
    list: U;
  },
  U
>(
  list: T[],
  constructor: new (title: string, desc: string, file?: Blob) => T
) => {
  const serializedMap = localStorage.getItem("projectThumbnail");
  const imageMap: Map<string, string> = serializedMap
    ? new Map(JSON.parse(serializedMap))
    : new Map();

  return list.map((item) => {
    const { title, desc, list, id, currentItemId } = item;
    let blob = imageMap.get(id)
      ? toBlob(imageMap.get(id) as string)
      : undefined;

    const newItem = new constructor(title, desc, blob);
    newItem.list = list;
    newItem.currentItemId = currentItemId;
    newItem.id = id;
    return newItem;
  });
};

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
      // getCurrentItem: action,
      createItem: action,
      createNewItem: action,
      deleteItem: action,
      Progress: computed,
      allItemCount: computed,
      completedItemCount: computed,
    });
    this.title = title;
    this.desc = desc;
    this.list = [];
    this.id = v4();
    this.currentItemId = null;
  }

  abstract createNewItem(title: string, desc: string, priority?: number): T;

  setCurrentItemId = (id: string) => {
    this.currentItemId = id;
  };

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

export class ProjectStore {
  ProjectList: Project[] = []; // Array of projects
  currentProjectId: string | undefined;

  constructor() {
    makeAutoObservable(this);
    this.currentProjectId = undefined;
    this.loadFromStorage();
    autorun(() => {
      localStorage.setItem("ProjectList", JSON.stringify(this.ProjectList));
    });
    autorun(async () => {
      const imageMap = new Map();

      await Promise.all(
        this.ProjectList.map(async (project) => {
          if (project.thumbNailFile) {
            const base64String = await incodeFile(project.thumbNailFile);
            if (base64String) imageMap.set(project.id, base64String);
          }
        })
      );

      const myMapArray = Array.from(imageMap.entries());
      const serializedMap = JSON.stringify(myMapArray);

      localStorage.setItem("projectThumbnail", serializedMap);
    });
    autorun(() => {
      localStorage.setItem(
        "currentProjectId",
        JSON.stringify(this.currentProjectId)
      );
    });
  }

  loadFromStorage() {
    const storedProjects = localStorage.getItem("ProjectList");
    if (!storedProjects) return;

    const parsedList: Project[] = JSON.parse(storedProjects);
    this.ProjectList = parseListLikeObject(parsedList, Project);

    const id = localStorage.getItem("currentProjectId");
    if (!id) return;
    this.currentProjectId = JSON.parse(id);
  }

  setCurrentProject = (id: string): void => {
    this.currentProjectId = id;
  };

  getCurrentProject = (): Project | undefined => {
    return this.ProjectList.find(
      (project) => project.id === this.currentProjectId
    );
  };

  createProject = (
    title: string,
    description: string,
    file: Blob | undefined
  ): void => {
    this.ProjectList.push(new Project(title, description, file));
  };

  deleteProject = (project: Project): void => {
    const index = this.ProjectList.indexOf(project);
    if (index !== -1) {
      this.ProjectList.splice(index, 1);
    }
  };

  updateProject = (
    project: Project,
    title: string,
    description: string
  ): void => {
    project.title = title;
    project.desc = description;
  };
}

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

const ProjectStoreContext = createContext<ProjectStore | null>(null);

export const ProjectStoreProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  return (
    <ProjectStoreContext.Provider value={new ProjectStore()}>
      {children}
    </ProjectStoreContext.Provider>
  );
};

export const useTodoStore = () => useContext(ProjectStoreContext);

export const useCurrentProject = () =>
  useContext(ProjectStoreContext)?.getCurrentProject();

export const useCurrentProjectTodos = (): undefined | Todo =>
  useContext(ProjectStoreContext)?.getCurrentProject()?.getCurrentItem();

/*
 이걸 근데 db에 저장한다고 생각하면. 어떻게 해야하냐면.
 ProjectStore. 
 Project.
 Todo.
 Step.

 이렇게 4가지 스키마를 만들어야 한다. 
 db에 메서드는 저장이 안되므로. 필요한 property만 저장해놓고. 불러올때는 새로운 객체를 생성해서 로드해야함.
 
 반복해야하는건

 projectstore의 리스트(project) db에서 가져옴 -> 새로운 인스턴스 생성 -> 기존 데이터 덧입히기 ->  projectStore에 저장
 project의 리스트(todo)를 파싱해서 project list에다가 집어넣기
 이렇게 두가지 작업이고
 step의 경우에는 method가 따로 없기 때문에 안해줘도 상관 없다.
 
 내가 하고싶은것은 재귀함수를 만들어서

 project의 리스트를 넣으면. 그 리스트의 리스트가 있을경우 또 반복작업 -> 또 반복작업. 이런식으로 하고싶은데.


*/
