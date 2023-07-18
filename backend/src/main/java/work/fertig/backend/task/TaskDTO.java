package work.fertig.backend.task;

import work.fertig.backend.base.BaseDTO;

import java.sql.Timestamp;

public interface TaskDTO extends BaseDTO {
    public String getName();

    public String getDescription();

    public Boolean getIsDone();

    public Boolean getIsDraft();

    public Timestamp getCreatedAt();

    public Timestamp getUpdatedAt();
}
