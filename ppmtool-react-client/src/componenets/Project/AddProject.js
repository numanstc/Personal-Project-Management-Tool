import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProject } from "../../actions/projectActions";
import classnames from "classnames";

class AddProject extends Component {
  constructor() {
    super();
    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {} // hatalar burada olacak globalde değil
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  // life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // onChange = event => {
  //   const {
  //     target: { name, value }
  //   } = event;
  //   this.setState({ [name]: value, event: event });
  // };
  //

  onSubmit(e) {
    e.preventDefault();
    const newProject = {
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date
    };

    // her rerenderda tekrar çalışacak ve bakacaks
    this.props.createProject(newProject, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Create Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.projectName
                    })}
                    //burada error varsa "is-invalid" bootstrap classini ekiyor.
                    placeholder="Project Name"
                    name="projectName"
                    value={this.props.projectName}
                    onChange={this.onChange}
                  />
                  {errors.projectName && (
                    <div className="invalid-feedback">{errors.projectName}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-c ontrol-lg", {
                      "is-invalid": errors.projectIdentifier
                    })}
                    placeholder="Unique Project ID"
                    name="projectIdentifier"
                    value={this.props.projectIdentifier}
                    onChange={this.onChange}
                  />
                  {errors.projectIdentifier && (
                    <div className="invalid-feedback">
                      {errors.projectIdentifier}
                    </div>
                  )}
                </div>
                {/*<!-- disabled for Edit Only!! remove "disabled" for the Create operation -->*/}
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-c ontrol-lg", {
                      "is-invalid": errors.description
                    })}
                    placeholder="Project Description"
                    name="description"
                    value={this.props.description}
                    onChange={this.onChange}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="start_date"
                    value={this.props.start_date}
                    onChange={this.onChange}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="end_date"
                    value={this.props.end_date}
                    onChange={this.onChange}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProject.propTypes = {
  createProject: PropTypes.func.isRequired, // buradaki func bunnun fonksiyon olduğunu belirtiyor
  errors: PropTypes.object.isRequired // buradaki object bunun object olduğunu belirtiyor.
};

const mapstateProps = state => ({
  errors: state.errors // -> buradaki state glabal projectActions dan geliyor
});

export default connect(mapstateProps, { createProject })(AddProject);
//null -> spate mapnini nasıl olduğunu gösteriyoru
