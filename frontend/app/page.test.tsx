import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("/ingame", () => {
  it("<main> 태그가 존재하는지 확인한다.", () => {
    render(<Page />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
