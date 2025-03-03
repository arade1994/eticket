import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import RateInput from "./RateInput";

const setCommentMock = vi.fn();
const setRateMock = vi.fn();

afterEach(() => cleanup());

describe("<RateInput />", () => {
  test("It should render rate input component as expected", async () => {
    const { baseElement } = render(
      <RateInput
        comment="Test comment"
        onChangeComment={setCommentMock}
        onChangeRate={setRateMock}
      />
    );

    expect(baseElement).toMatchSnapshot();

    const comment = await screen.findByRole("textbox");
    expect(comment).toBeDefined();
    expect(comment.textContent).toEqual("Test comment");
  });

  test("It should call setComment() method when comment is changed", async () => {
    render(
      <RateInput
        comment="Test comment"
        onChangeComment={setCommentMock}
        onChangeRate={setRateMock}
      />
    );

    const commentTxtArea = (await screen.findByRole(
      "textbox"
    )) as HTMLTextAreaElement;
    userEvent.clear(commentTxtArea);
    await userEvent.type(commentTxtArea, "Updated comment");
    expect(setCommentMock).toHaveBeenCalled();
  });

  test("It should call setRate() method when rate is selected", async () => {
    const { container } = render(
      <RateInput
        comment="Test comment"
        onChangeComment={setCommentMock}
        onChangeRate={setRateMock}
      />
    );

    const star3 = container.querySelector("[for='star3']") as Element;
    await userEvent.click(star3);
    expect(setRateMock).toHaveBeenCalled();
  });
});
