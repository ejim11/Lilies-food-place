import AllVendors from "./AllVendors";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import * as redux from "react-redux";

jest.mock("axios");

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("AllVendors", () => {
  test("renders a list of vendors", async () => {
    // creating a mock function
    // window.fetch = jest.fn();

    const data = {
      address: "10 Emene Village",
      company_name: "Beats by Dira",
      created_at: "2022-09-25T10:42:03.000000Z",
      deleted_at: null,
      email: "dira@gmail.com",
      id: "1",
      name: "Mrs Ifunanya",
      password: "$2y$10$UJk0AkQxjBU5bxB.Sw1r6ebh/1L4x1QeqzirM4Oqy.hqAPxJ8N3m.",
      phone: "09068938916",
      status: "1",
      type: "vendor",
      unique_id: "VEN713091",
      updated_at: "2022-10-04T09:01:50.000000Z",
      vendor_avatar: "vendorAvatar",
    };
    // window.fetch.mockResolvedValueOnce({
    //   json: async () => [
    //   ],
    // });

    const spy = jest.spyOn(redux, "useSelector");
    spy.mockReturnValue({ token: "test" });

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    // arrange
    render(<AllVendors />);

    const listElements = await screen.findAllByRole("listitems");
    // act
    // assert
    expect(listElements).not.toHaveLength(0);
  });
});
