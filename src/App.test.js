import React from "react";
import { shallow } from "enzyme";

import TestComponent from "./components/TestComponent";

describe("<TestComponent/>", () => {
  it("By default Should contain string 'Hello'", () => {
    const wrapper = shallow(<TestComponent />);
    const text = wrapper.find("button");
    expect(text.text()).toBe("Hello");
  });
  it("Should contain string of 'Green' passing as prop", () => {
    const testingString = "Green";
    const wrapper = shallow(<TestComponent text={testingString} />);
    const text = wrapper.find("button");
    expect(text.text()).toBe(testingString);
  });
});
