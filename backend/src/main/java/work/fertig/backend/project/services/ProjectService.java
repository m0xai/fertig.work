package work.fertig.backend.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import work.fertig.backend.project.dtos.ProjectDTORequest;
import work.fertig.backend.project.dtos.ProjectDTOResponse;
import work.fertig.backend.project.exceptions.ProjectNotFoundException;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.repositories.CollaboratorRepository;
import work.fertig.backend.project.repositories.ProjectRepository;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserService;

import java.util.Optional;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private FWUserService fwUserService;
    // TODO: Replace this with CASCADE solution
    @Autowired
    private CollaboratorRepository collaboratorRepository;

    public boolean existsById(Long id) {
        return projectRepository.existsById(id);
    }

    public Project getEntity(Long id) {
        Optional<Project> project = this.projectRepository.findById(id);
        if (project.isEmpty()) {
            throw new ProjectNotFoundException("Project with ID: " + id + " not found.");
        } else {
            return project.get();
        }
    }

    public ProjectDTOResponse get(Long id) {
        return ProjectDTOResponse.fromEntity(this.getEntity(id));
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

    @Transactional
    public boolean delete(Long id) {
        if (!projectRepository.existsById(id)) {
            return false;
        }
        collaboratorRepository.deleteByProjectId(id);
        projectRepository.deleteById(id);
        return true;
    }
}
