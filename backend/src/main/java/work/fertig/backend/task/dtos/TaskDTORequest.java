package work.fertig.backend.task.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.task.Task;
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
    private Long createdById;

    private TaskDTORequest() {
    }

    public Task convertToEntity(FWUser fwUser) throws UserNotFoundException {
        // No need to request id, created_at and updated_at fields from client
        return Task.builder()
                .name(this.getName())
                .description(this.getDescription())
                // Setting isDone and isDraft false by default may change in the future
                .isDone(false)
                .isDraft(false)
                .createdBy(fwUser)
                .build();
    }
}