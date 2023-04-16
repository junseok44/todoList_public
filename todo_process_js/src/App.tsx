import React from "react";
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import ProjectlistPage from "./pages/ProjectlistPage";
import ProjectTodoPage from "./pages/todopage/ProjectTodoPage";

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
  return <RouterProvider router={AppRouter}></RouterProvider>;
};

export default App;
