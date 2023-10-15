package work.fertig.backend.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.project.models.Project;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
@Component
public class ProjectDTOResponse implements ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private Boolean isArchived;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String color;
    private Timestamp startOn;
    private Long projectUsers;
    private Long createdBy;

    private ProjectDTOResponse() {
    }

    public static ProjectDTOResponse fromEntity(Project project) {
        // NOTE: We don't have ProjectUsers on creation yet, so set null,
        // but if we have, then return it's id
        // This may lead problems, make more research
        return ProjectDTOResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                //.projectUsers()
                .isArchived(project.getIsArchived())
                .startOn(project.getStartOn())
                .color(project.getColor())
                .createdBy(project.getCreatedBy().getId())
                .createdAt(project.getCreatedAt())
                .updatedAt(project.getUpdatedAt())
                .build();
    }
}
