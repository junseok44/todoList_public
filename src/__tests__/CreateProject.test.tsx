import { render, screen, fireEvent } from "@testing-library/react";
import CreateProject from "../pages/ProjectListPage/CreateProject";
import "@testing-library/jest-dom/extend-expect";
import ProjectView from "../pages/ProjectListPage/ProjectView";
import { ProjectStoreProvider } from "../state/ProjectStore";
import { Project } from "../state/Project";

const onCreateProject = (
  title: string,
  description: string,
  file: Blob | undefined
) => {
  console.log("hello");
};

const formElement = () => {
  const addButton = screen.getByText("Create a project");
  const titleInput =
    screen.getByPlaceholderText<HTMLInputElement>("프로젝트 제목을 입력");
  const descInput = screen.getByPlaceholderText("프로젝트 설명을 입력");
  const thumbnailPreview =
    screen.getByAltText<HTMLImageElement>("Thumbnail Preview");
  const thumbNailInput =
    screen.getByLabelText<HTMLInputElement>("thumbnail-upload");
  // const errMsg = screen.getByTestId("err-msg");

  return {
    addButton,
    titleInput,
    descInput,
    thumbNailInput,
    thumbnailPreview,
    // errMsg,
  };
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
    const addButton = screen.getByText("Create a project");

    fireEvent.click(addButton);
    const errMsg = screen.getByText("프로젝트 이름을 입력해주세요");
    expect(errMsg).toBeInTheDocument();
  });

  test("title은 입력하되, description이 없을때 에러가 출력되는지", () => {
    const { addButton, titleInput } = formElement();

    fireEvent.change(titleInput, { target: { value: "제목 아무거나" } });
    fireEvent.click(addButton);
    const errMsg = screen.getByText("프로젝트 설명을 입력해주세요");
    expect(errMsg).toBeInTheDocument();
  });

  test("thumbnail 업로드가 잘 되는지", () => {
    const { thumbnailPreview, thumbNailInput } = formElement();

    const testFile = new File(["(⌣_⌣)"], "chucknorris.png", {});
    fireEvent.change(thumbNailInput, { target: { files: [testFile] } });
    expect(thumbNailInput.files?.[0]).toStrictEqual(testFile);
    expect(thumbnailPreview.src).toContain("blob:http://localhost:3000");
  });
});

describe("project creation", () => {
  const setCurrentProject = jest.fn((id: string) => {});
  const deleteProject = jest.fn((id: string) => {});
  beforeEach(() => {
    render(
      <ProjectStoreProvider>
        <>
          <CreateProject onCreateProject={onCreateProject}></CreateProject>
          <ProjectView
            setCurrentProject={setCurrentProject}
            deleteProject={deleteProject}
          ></ProjectView>
        </>
      </ProjectStoreProvider>
    );
  });
  test("form에 데이터 입력하고 submit할시 아이템 추가되는지", async () => {
    const { titleInput, descInput, addButton } = formElement();
    fireEvent.change(titleInput, { target: { value: "title 아무거나" } });
    fireEvent.change(descInput, { target: { value: "description 아무거나" } });
    fireEvent.click(addButton);

    const listItem = await screen.findByText("title 아무거나");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveTextContent("description 아무거나");
  });

  test("form에 사진도 추가하고 submit할시 src가 변경된 아이템이 추가되는지", () => {});
});

describe("project delete", () => {});
