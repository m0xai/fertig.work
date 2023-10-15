package work.fertig.backend.project.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import work.fertig.backend.project.models.ProjectUsers;
import work.fertig.backend.user.dtos.FWUserDTOResponse;

import java.util.List;

@Getter
@Setter
@Builder
@Data
@AllArgsConstructor
public class ProjectUsersDTOResponse {
    private Long id;
    @NotNull(message = "You have to provide a project for project users.")
    private Long project;
    private List<FWUserDTOResponse> invitedUsers;
    private List<FWUserDTOResponse> joinedUsers;
    private List<FWUserDTOResponse> leftUsers;

    public static ProjectUsersDTOResponse fromProjectUsers(ProjectUsers projectUsers) {
        List<FWUserDTOResponse> invitedUsers =
                projectUsers.getInvitedUsers().stream().map(FWUserDTOResponse::fromEntity).toList();
        List<FWUserDTOResponse> joinedUsers =
                projectUsers.getJoinedUsers().stream().map(FWUserDTOResponse::fromEntity).toList();
        List<FWUserDTOResponse> leftUsers =
                projectUsers.getLeftUsers().stream().map(FWUserDTOResponse::fromEntity).toList();

        return ProjectUsersDTOResponse.builder().id(projectUsers.getId()).project(projectUsers.getProject().getId()).invitedUsers(invitedUsers).joinedUsers(joinedUsers).leftUsers(leftUsers).build();
    }
}
