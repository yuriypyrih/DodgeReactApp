import React from "react";

type TestComponentType = {
  text?: string;
};

const TestComponent: React.FC<TestComponentType> = ({ text = "Hello" }) => {
  return <button>{text}</button>;
};

export default TestComponent;
