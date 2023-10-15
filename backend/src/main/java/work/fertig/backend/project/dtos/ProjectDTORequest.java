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
public class ProjectDTORequest implements ProjectDTO {
    private Long id;
    private String title;
    private String description;
    private Boolean isArchived;
    private String color;
    private Timestamp startOn;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    // private Company getCompany;
    // NOTE: No need to implement projectUsers in request, since we create it after createion of project

    private ProjectDTORequest() {
    }


}
