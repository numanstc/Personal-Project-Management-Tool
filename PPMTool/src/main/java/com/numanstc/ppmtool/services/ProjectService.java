package com.numanstc.ppmtool.services;

import com.numanstc.ppmtool.domain.Project;
import com.numanstc.ppmtool.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project saveOrUpdate(Project project){


        return projectRepository.save(project);
    }
}
