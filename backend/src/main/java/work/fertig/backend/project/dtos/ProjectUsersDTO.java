package work.fertig.backend.project.dtos;

import work.fertig.backend.base.BaseDTO;
import work.fertig.backend.user.FWUser;

import java.util.List;

public interface ProjectUsersDTO extends BaseDTO {
    List<FWUser> getInvitedUsers();

    List<FWUser> getJoinedUsers();

    List<FWUser> getLeftUsers();
}
