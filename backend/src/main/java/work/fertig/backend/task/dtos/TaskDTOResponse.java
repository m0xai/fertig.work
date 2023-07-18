package work.fertig.backend.task.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import work.fertig.backend.task.Task;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
public class TaskDTOResponse implements TaskDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean isDone;
    private Boolean isDraft;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public static TaskDTOResponse fromTask(Task task) {
        return TaskDTOResponse.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .isDone(task.getIsDone())
                .isDraft(task.getIsDraft())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}
