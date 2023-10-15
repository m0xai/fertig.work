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
    @Autowired
    private FWUserService fwUserService;

    public ProjectDTOResponse get(Long id) {
        Optional<Project> project = this.projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new ProjectNotFoundException("Project with ID: " + id + " not found.");
        } else {
            return ProjectDTOResponse.fromEntity(project.get());
        }
    }

    public ProjectDTOResponse create(ProjectDTORequest request) {
        FWUser fwUser = this.fwUserService.getCurrentUser();
        Project requestProject = request.convertToEntity(fwUser);
        try {
            Project createdProject = projectRepository.save(requestProject);
            return ProjectDTOResponse.fromEntity(createdProject);
        } catch (RuntimeException ex) {
            throw new RuntimeException("Failed to create new Project " + ex.getMessage());
        }
    }
}
