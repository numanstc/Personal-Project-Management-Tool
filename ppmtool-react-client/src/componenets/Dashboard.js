import React, { Component } from "react";
import ProjectItem from "./Project/ProjecItem";

class Dashbord extends Component {
  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <a href="ProjectForm.html" className="btn btn-lg btn-info">
                Create a Project
              </a>
              <br />
              <hr />

              {/*<!-- Project Item Component -->*/}
              <ProjectItem />
              {/*<!-- End of Project Item Component -->*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Dashbord;
