package work.fertig.backend.task.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import work.fertig.backend.task.Task;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
public class TaskDTORequest implements TaskDTO {
    private Long id;
    private String name;
    private String description;
    private Boolean isDone;
    private Boolean isDraft;
    private Timestamp createdAt;
    private Timestamp updatedAt;

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
