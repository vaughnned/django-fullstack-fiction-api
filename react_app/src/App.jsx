import React from "react";
import MyComponent from "./components/MyComponent";

const App = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div>
      <h1 className="title">Welcome to My App</h1>

      <MyComponent />
    </div>
  );
};

export default App;
