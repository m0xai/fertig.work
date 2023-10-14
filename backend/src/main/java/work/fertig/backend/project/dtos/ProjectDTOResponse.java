package work.fertig.backend.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.project.Project;

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
    private Long projectUsers;

    private ProjectDTOResponse() {
    }

    public static ProjectDTOResponse fromProject(Project project) {
        return ProjectDTOResponse.builder().id(project.getId()).title(project.getTitle()).description(project.getDescription()).projectUsers(project.getProjectUsers().getId()).createdAt(project.getCreatedAt()).updatedAt(project.getUpdatedAt()).build();
    }
}
