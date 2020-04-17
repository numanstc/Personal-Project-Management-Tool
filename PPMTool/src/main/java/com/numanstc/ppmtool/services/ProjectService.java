package com.numanstc.ppmtool.services;

import com.numanstc.ppmtool.domain.Backlog;
import com.numanstc.ppmtool.domain.Project;
import com.numanstc.ppmtool.domain.User;
import com.numanstc.ppmtool.exceptions.ProjectIdException;
import com.numanstc.ppmtool.exceptions.ProjectNotFoundException;
import com.numanstc.ppmtool.repositories.BacklogRepository;
import com.numanstc.ppmtool.repositories.ProjectRepository;
import com.numanstc.ppmtool.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository, BacklogRepository backlogRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
        this.userRepository = userRepository;
    }

    public Project saveOrUpdate(Project project, String username) {

        try {

            User user = userRepository.findByUsername(username);

            project.setUser(user);
            project.setProjectLeader(username);

            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

            if (project.getId()  == null){
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                backlog.setProjectIdentifier(project.getProjectIdentifier());
                project.setBacklog(backlog);
            } else {
                // TODO burada db sorgusunu azaltan bir çözüm ara
                project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + project.getProjectIdentifier().toUpperCase() + "' already exist.");
        }
    }

    public Project findProjectByIdentifier(String projectId, String username) {

        projectId = projectId.toUpperCase();
        Project project = projectRepository.findByProjectIdentifier(projectId);

        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectId + "' not exist.");
        }

        if (!project.getProjectLeader().equals(username))
            throw new ProjectNotFoundException("Project not found in your account");

        return project;
    }

    public Iterable<Project> findAllProject(String username) {
        return projectRepository.findAllByProjectLeader(username);
    }

    public void deleteProjectByIdentifier(String projectId, String username) {

        projectRepository.delete(findProjectByIdentifier(projectId, username));
    }
}
