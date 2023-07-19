package work.fertig.backend.task.dtos;

import work.fertig.backend.base.BaseDTO;
import work.fertig.backend.task.enums.TaskPriority;
import work.fertig.backend.task.enums.TaskStatus;

public interface TaskDTO extends BaseDTO {
    Long getId();

    String getName();

    String getDescription();

    Boolean getIsDone();

    Boolean getIsDraft();

    TaskStatus getStatus();

    TaskPriority getPriority();
}
