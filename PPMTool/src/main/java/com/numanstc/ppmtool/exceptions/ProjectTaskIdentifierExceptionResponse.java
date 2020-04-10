package com.numanstc.ppmtool.exceptions;

public class ProjectTaskIdentifierExceptionResponse {

    private String projectIdentifierNotChangeable;

    public ProjectTaskIdentifierExceptionResponse(String projectIdentifierNotChangeable) {
        this.projectIdentifierNotChangeable = projectIdentifierNotChangeable;
    }

    public String getProjectIdentifierNotChangeable() {
        return projectIdentifierNotChangeable;
    }

    public void setProjectIdentifierNotChangeable(String projectIdentifierNotChangeable) {
        this.projectIdentifierNotChangeable = projectIdentifierNotChangeable;
    }
}
