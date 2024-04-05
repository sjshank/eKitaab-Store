import "@testing-library/jest-dom";

import mockRouter from "next-router-mock";
//@ts-ignore
global.mockRouter = mockRouter;

jest.mock("next/router", () => jest.requireActual("next-router-mock"));
