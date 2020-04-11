package com.numanstc.ppmtool.services;

import com.numanstc.ppmtool.domain.Backlog;
import com.numanstc.ppmtool.domain.Project;
import com.numanstc.ppmtool.domain.ProjectTask;
import com.numanstc.ppmtool.exceptions.ProjectNotFoundException;
import com.numanstc.ppmtool.exceptions.ProjectTaskIdentifierException;
import com.numanstc.ppmtool.repositories.BacklogRepository;
import com.numanstc.ppmtool.repositories.ProjectRepository;
import com.numanstc.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

        if (project == null) {
            throw new ProjectNotFoundException("Project with Id '" + id + "' does not exist.");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlogId, String sequence) {

        // make sure we are searching on the right backlog
        Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
        if (backlog == null)
            throw new ProjectNotFoundException("Project with ID '" + backlogId + "' does not exist.");

        // make sure that our task exist
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
        if (projectTask == null)
            throw new ProjectNotFoundException("Project Task '" + sequence + "' does not exist.");

        // make sure that the backlog/project id in the path correspond to the right project
        if (!projectTask.getProjectIdentifier().equals(backlogId))
            throw new ProjectNotFoundException("Project Task '"
                    + sequence + "' does not exist in project '" + backlogId + "'.");

        return projectTask;
    }

    public ProjectTask updatePTByProjectSequence(ProjectTask updatedTask, String backlogId, String sequence) {

        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence);

        if (!projectTask.getProjectIdentifier().equals(sequence))
            throw new ProjectTaskIdentifierException("Project Task Identifier does not changeable.");

        return projectTaskRepository.save(updatedTask);
    }

    public void deletePTByProjectSequence(String backlogId, String sequence) {

        ProjectTask projectTask = findPTByProjectSequence(backlogId, sequence);

        projectTaskRepository.delete(projectTask);
    }
}
