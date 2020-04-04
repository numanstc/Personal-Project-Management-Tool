import React from "react";
import Dashboard from "./componenets/Dashboard";
import Header from "./componenets/Layout/Header";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
