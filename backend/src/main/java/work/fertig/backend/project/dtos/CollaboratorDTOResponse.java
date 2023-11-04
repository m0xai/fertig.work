package work.fertig.backend.project.dtos;

import lombok.*;
import work.fertig.backend.project.models.Collaborator;
import work.fertig.backend.user.dtos.FWUserDTOResponse;

import java.sql.Timestamp;

@Data
@Getter
@Setter
@AllArgsConstructor
@Builder
public class CollaboratorDTOResponse implements CollaboratorDTO {
    private Long id;
    private FWUserDTOResponse user;
    private Long project;
    private String role;
    private Boolean isJoined;
    private Timestamp joinedOn;
    private Boolean isInvited;
    private Timestamp invitedOn;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public static CollaboratorDTOResponse fromEntity(Collaborator collaborator) {
        return CollaboratorDTOResponse.builder()
                .id(collaborator.getId())
                .user(FWUserDTOResponse.fromEntity(collaborator.getUser()))
                .project(collaborator.getProject().getId())
                .role(collaborator.getRole())
                .isJoined(collaborator.getIsJoined())
                .joinedOn(collaborator.getJoinedOn())
                .isInvited(collaborator.getIsInvited())
                .invitedOn(collaborator.getInvitedOn())
                .createdAt(collaborator.getCreatedAt())
                .updatedAt(collaborator.getUpdatedAt())
                .build();
    }
}
