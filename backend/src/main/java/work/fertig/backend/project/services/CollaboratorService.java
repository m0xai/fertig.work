package work.fertig.backend.project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import work.fertig.backend.project.dtos.CollaboratorDTORequest;
import work.fertig.backend.project.dtos.CollaboratorDTOResponse;
import work.fertig.backend.project.models.Collaborator;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.project.repositories.CollaboratorRepository;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CollaboratorService {
    @Autowired
    private CollaboratorRepository collaboratorRepository;

    @Autowired
    private FWUserService fwUserService;

    @Autowired
    private ProjectService projectService;

    public CollaboratorDTOResponse create(CollaboratorDTORequest request) {
        return CollaboratorDTOResponse.fromEntity(createEntity(request));
    }

    private Collaborator createEntity(CollaboratorDTORequest that) {
        if (that == null) {
            throw new RuntimeException("Collaborator doesn't have correct object.");
        }
        FWUser user = fwUserService.getUserEntity(that.getUser());
        Project project = projectService.getEntity(that.getProject());
        return collaboratorRepository.save(that.toEntity(user, project));
    }

    public List<CollaboratorDTOResponse> createBulk(List<CollaboratorDTORequest> request) throws RuntimeException {
        if (request == null) {
            throw new RuntimeException("Collaborator doesn't have correct object.");
        }
        if (request.isEmpty()) {
            return new ArrayList<>();
        }
        List<CollaboratorDTOResponse> collaborators = new ArrayList<>();
        FWUser user = fwUserService.getUserEntity(request.get(0).getUser());
        Project project = projectService.getEntity(request.get(0).getProject());
        for (CollaboratorDTORequest collaboratorDTORequest :
                request) {
            Collaborator collaborator = collaboratorRepository.save(collaboratorDTORequest.toEntity(user, project));
            collaborators.add(CollaboratorDTOResponse.fromEntity(collaborator));
        }
        return collaborators;
    }

    public CollaboratorDTOResponse get(Long id) throws RuntimeException {
        Optional<Collaborator> collaborator = collaboratorRepository.findById(id);
        if (collaborator.isEmpty()) {
            throw new RuntimeException("Collaborator with ID: " + id + " not found.");
        }
        return CollaboratorDTOResponse.fromEntity(collaborator.get());
    }

    public List<CollaboratorDTOResponse> getCollaboratorsByProject(Long projectId) {
        return collaboratorRepository.findAllByProjectId(projectId)
                .stream()
                .map(CollaboratorDTOResponse::fromEntity)
                .toList();
    }

}
