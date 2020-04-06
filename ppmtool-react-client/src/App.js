import React from "react";
import Dashboard from "./componenets/Dashboard";
import Header from "./componenets/Layout/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./componenets/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/addProject" component={AddProject} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
