package work.fertig.backend.project.dtos;

import work.fertig.backend.base.BaseDTO;

import java.sql.Timestamp;

public interface ProjectDTO extends BaseDTO {
    String getTitle();

    Boolean getIsArchived();

    String getDescription();
    // Company getCompany()

    String getColor();

    Timestamp getStartOn();

}
