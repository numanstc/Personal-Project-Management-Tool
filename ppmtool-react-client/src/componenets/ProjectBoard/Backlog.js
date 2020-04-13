import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props;
    let todoTasks = [];
    let inProgressTasks = [];
    let doneTasks = [];

    project_tasks_prop.forEach(project_task => {
      if (project_task.status === "DONE")
        doneTasks.push(
          <ProjectTask key={project_task.id} project_task={project_task} />
        );
      else if (project_task.status === "IN_PROGRESS")
        inProgressTasks.push(
          <ProjectTask key={project_task.id} project_task={project_task} />
        );
      else
        todoTasks.push(
          <ProjectTask key={project_task.id} project_task={project_task} />
        );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoTasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressTasks}
            {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
            {/*<!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneTasks}
            {/*<!-- SAMPLE PROJECT TASK STARTS HERE -->*/}
            {/*<!-- SAMPLE PROJECT TASK ENDS HERE -->*/}
          </div>
        </div>
      </div>
    );
  }
}
export default Backlog;
