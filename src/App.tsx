import React from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import ProjectlistPage from "./pages/ProjectListPage/ProjectListPage";
import ProjectTodoPage from "./pages/ProjectTodoPage/ProjectTodoPage";
import { ProjectStoreProvider } from "./state/ProjectStore";

const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<ProjectlistPage></ProjectlistPage>}></Route>
      <Route
        path="/project/:id"
        element={<ProjectTodoPage></ProjectTodoPage>}
      ></Route>
    </>
  )
);

// Define App component
const App = () => {
  return (
    <ProjectStoreProvider>
      <RouterProvider router={AppRouter}></RouterProvider>
    </ProjectStoreProvider>
  );
};

export default App;
