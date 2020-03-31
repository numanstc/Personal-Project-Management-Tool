package com.numanstc.ppmtool.web;

import com.numanstc.ppmtool.domain.Project;
import com.numanstc.ppmtool.services.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result) {

//        Binding Error hataları barındıran bir interface. hataları bu şekilde yönetebilirz.
        if (result.hasErrors()) {
            return new ResponseEntity<>("Invalid Object", HttpStatus.BAD_REQUEST);
        }
        Project savedProject = projectService.saveOrUpdate(project);
        return new ResponseEntity<Project>(savedProject, HttpStatus.CREATED);
    }
}
