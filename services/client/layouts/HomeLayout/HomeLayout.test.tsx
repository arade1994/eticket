import { describe, expect, test, vi } from "vitest";

import { render } from "@testing-library/react";

import HomeLayout from "./HomeLayout";

vi.mock("next/router", () => ({
  useRouter: () => ({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: vi.fn(),
  }),
}));

vi.mock("../../components/HeroContent/Hero", () => ({
  default: () => "Hero Component",
}));

vi.mock("../../components/Features/Features", () => ({
  default: () => "Features Component",
}));

vi.mock("../../components/Statistics/Statistics", () => ({
  default: () => "Statistics Component",
}));

describe("<HomeLayout />", () => {
  test("it should match a snapshot when rendered by default", () => {
    const { baseElement } = render(<HomeLayout />);

    expect(baseElement).toMatchSnapshot();
  });
});
