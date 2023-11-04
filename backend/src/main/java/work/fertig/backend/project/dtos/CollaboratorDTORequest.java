package work.fertig.backend.project.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import work.fertig.backend.project.models.Collaborator;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class CollaboratorDTORequest implements CollaboratorDTO {
    private Long id;
    @NotNull(message = "User ID field cannot be blank.")
    private Long user;
    @NotNull(message = "Project ID field cannot be blank.")
    private Long project;
    private String role;
    private Boolean isJoined;
    private Timestamp joinedOn;
    private Boolean isInvited;
    private Timestamp invitedOn;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    private CollaboratorDTORequest() {
    }

    public Collaborator toEntity(FWUser fwUser, Project project) {
        return Collaborator.builder()
                .id(this.getId())
                .user(fwUser)
                .project(project)
                .role(this.getRole())
                .isInvited(this.getIsInvited())
                .invitedOn(this.getInvitedOn())
                .isJoined(this.getIsJoined())
                .joinedOn(this.getJoinedOn())
                .build();
    }
}
