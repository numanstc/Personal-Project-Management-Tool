import React, { Component } from "react";
import ProjectItem from "./Project/ProjecItem";
import CreateProjectButton from "./Project/CreateProjectButton";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashbord extends Component {
  // altta verilen getProjects i burada kullanıyoruz
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />
              <CreateProjectButton />
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

Dashbord.propTypes = {
  project: PropTypes.object.isRequired,
  getProjects: PropTypes.func.isRequired
};

// burası başlangıç proplerının verildiği yer
// reducer/index.js deki project i alıyor
const mapStateToProps = state => ({
  project: state.project
});

export default connect(
  mapStateToProps,
  { getProjects }
)(Dashbord);
