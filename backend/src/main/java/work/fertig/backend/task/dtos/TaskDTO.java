package work.fertig.backend.task.dtos;

import work.fertig.backend.base.BaseDTO;

public interface TaskDTO extends BaseDTO {
    Long getId();

    String getName();

    String getDescription();

    Boolean getIsDone();

    Boolean getIsDraft();
}
