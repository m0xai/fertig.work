package work.fertig.backend.task.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.task.Task;
import work.fertig.backend.task.enums.TaskPriority;
import work.fertig.backend.task.enums.TaskStatus;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.exceptions.UserNotFoundException;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
@Component
public class TaskDTORequest implements TaskDTO {
    private Long id;
    @NotBlank(message = "A name for the task is required.")
    private String name;
    @NotBlank(message = "A description for the task is required.")
    private String description;
    private Boolean isDone;
    private Boolean isDraft;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    @NotNull(message = "User id cannot be blank.")
    private Long createdBy;
    @NotNull(message = "Status field cannot left blank.")
    private TaskStatus status;
    @NotNull(message = "Priority field cannot be blank.")
    private TaskPriority priority;
    // Get only id of taskList from client
    private Long taskList;

    private TaskDTORequest() {
    }

    public Task convertToEntity(FWUser fwUser, TaskList taskList) throws UserNotFoundException {
        // No need to request id, created_at and updated_at fields from client
        return Task.builder()
                .name(this.getName())
                .description(this.getDescription())
                // Setting isDone and isDraft false by default may change in the future
                .isDone(false)
                .isDraft(false)
                .createdBy(fwUser)
                .status(this.getStatus())
                .priority(this.getPriority())
                .taskList(taskList)
                .build();
    }
}