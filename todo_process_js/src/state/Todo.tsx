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

export class ProjectStore {
  public ProjectList: Project[];
  public CurrentProject: Project | null;

  constructor() {
    makeAutoObservable(this);
    this.ProjectList = [];
    this.CurrentProject = null;
    this.createProject = this.createProject.bind(this);
    this.setCurrentProject = this.setCurrentProject.bind(this);
  }

  setCurrentProject(id: string): void {
    const project = this.ProjectList.find((p) => p.id === id);
    if (project) {
      this.CurrentProject = project;
    }
  }

  createProject(title: string, description: string, src: string): void {
    const newProject = new Project(title, description, src);
    this.ProjectList.push(newProject);
  }

  deleteProject(project: Project): void {
    const index = this.ProjectList.indexOf(project);
    if (index !== -1) {
      this.ProjectList.splice(index, 1);
    }
  }

  updateProject(project: Project, title: string, description: string): void {
    project.title = title;
    project.desc = description;
  }
}

// Define the Project class
// export class Project {
//   public Todos: Todo[]; // Array of Todo objects
//   public id: string; // Unique identifier for the project
//   public currentTodoId: string | null; // ID of the currently selected Todo

//   constructor(
//     public title: string, // Title of the project
//     public description: string, // Description of the project
//     public thumbNailSrc:
//       | string
//       | undefined = `${process.env.PUBLIC_URL}/japan.jpg` // Thumbnail image source for the project
//   ) {
//     makeAutoObservable(this); // Automatically make all properties observable
//     this.Todos = []; // Initialize the Todos array
//     this.id = v4(); // Generate a unique ID for the project
//     this.thumbNailSrc = thumbNailSrc; // Set the thumbnail image source
//     this.currentTodoId = null; // Initialize the currentTodoId to null
//     this.setCurrentTodoId = this.setCurrentTodoId.bind(this);
//   }

//   // Get the currently selected Todo object
//   get getCurrentTodo(): Todo | undefined {
//     return this.Todos.find((todo) => todo.id === this.currentTodoId);
//   }

//   get Progress() {
//     if (this.completedTodos == 0 || this.allTodosCount == 0) return 0;
//     return Math.floor((this.completedTodos / this.allTodosCount) * 100);
//   }

//   // Set the ID of the currently selected Todo
//   setCurrentTodoId(id: string) {
//     this.currentTodoId = id;
//   }

//   // Get the number of completed Todos
//   get completedTodos(): number {
//     return this.Todos.filter((todos) => todos.done).length;
//   }

//   // Get the total number of Todos
//   get allTodosCount(): number {
//     return this.Todos.length;
//   }

//   // Add a new Todo to the Todos array
//   addTodo = (title: string) => {
//     this.Todos.push(new Todo(title));
//   };

//   // Delete a Todo from the Todos array
//   deleteTodo = (id: string) => {
//     this.Todos = this.Todos.filter((todo) => todo.id !== id);
//     // FIXME observable array should be mutate method
//   };
// }

// export class Todo {
//   public id: string;
//   public done: boolean;
//   public steps: Step[];
//   constructor(public name: string) {
//     makeAutoObservable(this);
//     this.done = false;
//     this.steps = [];
//     this.id = v4();
//     this.addNewStep = this.addNewStep.bind(this);
//   }

//   get isDone() {
//     // 모든 steps의 done이 true일경우. done = true.

//     // this.done = this.steps.forEach(step => step.done ===)
//     return this.done;
//   }

//   get Progress() {
//     if (this.completedSteps == 0 || this.allStepsCount == 0) return 0;
//     return Math.floor((this.completedSteps / this.allStepsCount) * 100);
//   }

//   addNewStep(name: string, desc: string, priority: number) {
//     this.steps.push(new Step(name, desc, priority, false));
//   }

//   get completedSteps(): number {
//     return this.steps.filter((steps) => steps.done).length;
//   }

//   get allStepsCount(): number {
//     return this.steps.length;
//   }
// }

// export class Step {
//   constructor(
//     public name: string,
//     public desc: string,
//     public priority: number,
//     public done: boolean
//   ) {
//     makeAutoObservable(this);
//   }
// }

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
  constructor(public title: string, public desc: string | null) {
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

  abstract createNewItem(title: string, desc: string): T;

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

  createItem = (title: string, description: string): void => {
    const newItem = this.createNewItem(title, description);
    this.list.push(newItem);
  };

  deleteItem = (id: string): void => {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  };
}

export class Project extends Store<Todo> {
  thumbNailSrc: string | null;
  constructor(title: string, desc: string, thumbNailSrc: string) {
    super(title, desc);
    this.thumbNailSrc = thumbNailSrc;
  }
  createNewItem(title: string, desc: string): Todo {
    return new Todo(title, desc);
  }
}

export class Todo extends Store<Step> {
  done: boolean;
  constructor(title: string, desc: string) {
    super(title, desc);
    makeObservable(this, {
      done: observable,
    });
    this.done = false;
  }
  createNewItem(title: string): Step {
    return new Step(title);
  }
}

export class Step {
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

const ProjectStoreContext = createContext<null | ProjectStore>(null);

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

// FIXME 이 부분 리팩토링 가능한지?
export const useTodoStore = () => {
  const todoStore = useContext(ProjectStoreContext);

  return todoStore;
};

export const useCurrentProject = () => {
  const todoStore = useContext(ProjectStoreContext);

  if (todoStore) {
    return todoStore.CurrentProject;
  }
};

export const useCurrentProjectTodos = () => {
  const todoStore = useContext(ProjectStoreContext);

  if (todoStore) {
    return todoStore.CurrentProject?.getCurrentItem();
  }
};

// store instance를 불러와서.

// 걔의 currentProject 함수를 통해서
// currentProject를 불러오고.
// 걔의 setTodo함수를 통해서 set하고
// set 된것을 함수 호출해야하는데.
