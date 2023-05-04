import { render, screen, fireEvent } from "@testing-library/react";
import CreateProject from "../pages/ProjectListPage/CreateProject";
import "@testing-library/jest-dom/extend-expect";

const onCreateProject = (
  title: string,
  description: string,
  file: Blob | undefined
) => {
  console.log("hello");
};

describe("basic rendering test", () => {
  global.URL.createObjectURL = jest.fn(() => "new src");
  global.URL.revokeObjectURL = jest.fn(() => {});
  test("렌더링 잘 되는지", () => {
    render(<CreateProject onCreateProject={onCreateProject}></CreateProject>);

    expect(screen.getByText("Add Project")).toBeInTheDocument();
  });
});

describe("form validation", () => {
  beforeEach(() => {
    render(
      <CreateProject
        onCreateProject={jest.fn(
          (title: string, description: string, file: Blob | undefined) => {}
        )}
      ></CreateProject>
    );
  });

  test("title을 공백으로 하고 버튼 입력시 에러가 출력되는지", () => {
    const addButton = screen.getByTestId("create-project-button");

    fireEvent.click(addButton);
    const errMsg = screen.getByText("프로젝트 이름을 입력해주세요");
    expect(errMsg).toBeInTheDocument();
  });

  test("title은 입력하되, description이 없을때 에러가 출력되는지", () => {
    const addButton = screen.getByTestId("create-project-button");
    const titleInput =
      screen.getByPlaceholderText<HTMLInputElement>("프로젝트 제목을 입력");
    fireEvent.change(titleInput, { target: { value: "제목 아무거나" } });
    fireEvent.click(addButton);
    const errMsg = screen.getByText("프로젝트 설명을 입력해주세요");
    expect(errMsg).toBeInTheDocument();
  });

  test("thumbnail 업로드가 잘 되는지", () => {});
});
