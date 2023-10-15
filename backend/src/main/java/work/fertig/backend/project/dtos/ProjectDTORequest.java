package work.fertig.backend.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
@Component
public class ProjectDTORequest implements ProjectDTO {
    private Long id; // NOTE: We may need to write dedicated DTO for creation
    private String title;
    private String description;
    private Boolean isArchived;
    private String color;
    private Timestamp startOn;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    // private Company getCompany;
    // NOTE: No need to implement projectUsers in request, since we create it after creation of project

    private ProjectDTORequest() {
    }

    public Project convertToEntity(FWUser fwUser) {
        // NOTE: No need to handle UserNotFound, since we only use currentUser, don't get created by from request
        return Project.builder()
                .id(this.getId())
                .title(this.getTitle())
                .description(this.getDescription())
                .startOn(this.getStartOn())
                .color(this.getColor())
                .isArchived(this.getIsArchived())
                .createdBy(fwUser)
                .build();
    }
}
