package work.fertig.backend.tasklist.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
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
    private List<Long> taskIds;

    public TaskList convertToEntity() {
        return TaskList.builder()
                .id(this.getId())
                .title(this.getTitle())
                .createdAt(this.getCreatedAt())
                .updatedAt(this.getUpdatedAt())
//                .tasks(tasks)
                .build();
    }
}
