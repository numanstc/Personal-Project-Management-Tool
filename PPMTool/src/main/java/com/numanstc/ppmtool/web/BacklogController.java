package com.numanstc.ppmtool.web;

import com.numanstc.ppmtool.domain.ProjectTask;
import com.numanstc.ppmtool.services.MapValidationErrorService;
import com.numanstc.ppmtool.services.ProjectService;
import com.numanstc.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin(origins = "*")
public class BacklogController {

    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result,
                                                     @PathVariable String backlog_id) {

        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        ProjectTask createdProjectTask = projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity <>(createdProjectTask, HttpStatus.CREATED);
    }

}
