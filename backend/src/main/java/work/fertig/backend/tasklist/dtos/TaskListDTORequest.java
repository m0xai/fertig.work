package work.fertig.backend.tasklist.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import work.fertig.backend.project.models.Project;
import work.fertig.backend.tasklist.TaskList;

import java.sql.Timestamp;
import java.util.List;

@Data
@Builder
public class TaskListDTORequest implements TaskListDTO {
    private Long id;
    @NotBlank(message = "Title of a task cannot be blank or whitespaces.")
    private String title;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    @NotNull(message = "Project ID of a tasklist cannot be null.")
    private Long project;
    private List<Long> taskIds;

    public TaskList convertToEntity(Project project) {
        return TaskList.builder()
                .id(this.getId())
                .title(this.getTitle())
                .createdAt(this.getCreatedAt())
                .updatedAt(this.getUpdatedAt())
                .project(project)
//                .tasks(tasks)
                .build();
    }
}
