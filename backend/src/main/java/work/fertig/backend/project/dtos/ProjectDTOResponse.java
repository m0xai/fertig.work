package work.fertig.backend.project.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;

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

    private ProjectDTOResponse() {
    }
}
