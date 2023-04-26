import { autorun, makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";
import { incodeFile, toBlob } from "../lib/base64Incode";
import { Project } from "./Project";
import { Todo } from "./Todo";

const parseListItemFromJson = <
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
    this.ProjectList = parseListItemFromJson(parsedList, Project);

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