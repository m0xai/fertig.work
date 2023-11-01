package work.fertig.backend.project.dtos;

import work.fertig.backend.base.BaseDTO;

import java.sql.Timestamp;


public interface CollaboratorDTO extends BaseDTO {

    String getRole();

    Boolean getIsJoined();

    Timestamp getJoinedOn();

    Boolean getIsInvited();

    Timestamp getInvitedOn();

}
