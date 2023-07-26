package work.fertig.backend.task.dtos;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import work.fertig.backend.task.Task;
import work.fertig.backend.task.enums.TaskPriority;
import work.fertig.backend.task.enums.TaskStatus;
import work.fertig.backend.user.dtos.FWUserDTOResponse;

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
    private FWUserDTOResponse createdBy;
    private TaskStatus status;
    private TaskPriority priority;
    private Long taskList;

    public static TaskDTOResponse fromTask(Task task) {
        return TaskDTOResponse.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .isDone(task.getIsDone())
                .isDraft(task.getIsDraft())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                // We don't want to respond with user's password etc. sensitive information
                .createdBy(FWUserDTOResponse.fromEntity(task.getCreatedBy()))
                .status(task.getStatus())
                .priority(task.getPriority())
                .taskList(task.getTaskList().getId())
                .build();
    }
}
