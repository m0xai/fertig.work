package work.fertig.backend.user.dtos;

import work.fertig.backend.base.BaseDTO;

public interface FWUserDTO extends BaseDTO {
    Long getId();

    String getUsername();

    String getEmail();


}
