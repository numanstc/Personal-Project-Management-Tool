package com.numanstc.ppmtool.services;

import com.numanstc.ppmtool.domain.Backlog;
import com.numanstc.ppmtool.domain.Project;
import com.numanstc.ppmtool.domain.ProjectTask;
import com.numanstc.ppmtool.exceptions.ProjectNotFoundException;
import com.numanstc.ppmtool.repositories.BacklogRepository;
import com.numanstc.ppmtool.repositories.ProjectRepository;
import com.numanstc.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

        //Exception: Project not found
        try {
            //PTs to be added to specific  object, project != null, Backlog exist
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            // set the backlog to projectTask
            projectTask.setBacklog(backlog);

            // we want our project sequence to be like this: IDPRO-1, IDPRO-2, ...
            Integer backlogSequence = backlog.getPTSequence();

            // update backlog sequence
            backlogSequence++;

            backlog.setPTSequence(backlogSequence);

            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
                projectTask.setPriority(3);
            }

            if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new ProjectNotFoundException("Project Not Found");
        }
    }

    public Iterable<ProjectTask> findBacklogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);

        if(project == null) {
            throw new ProjectNotFoundException("Project with Id '" + id + "' does not exist.");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlogId, String sequence) {

        // TODO error handling

        // make sure we are searching on the right backlog
        return projectTaskRepository.findByProjectSequence(sequence);
    }
}
