package work.fertig.backend.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.fertig.backend.project.dtos.ProjectDTOResponse;
import work.fertig.backend.project.exceptions.ProjectNotFoundException;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.repositories.ProjectRepository;

import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public ProjectDTOResponse get(Long id) {
        Optional<Project> project = this.projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new ProjectNotFoundException("Project with ID: " + id + " not found.");
        } else {
            return ProjectDTOResponse.fromEntity(project.get());
        }
    }
}
