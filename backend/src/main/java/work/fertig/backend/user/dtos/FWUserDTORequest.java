package work.fertig.backend.user.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import work.fertig.backend.user.FWUser;

@Data
@AllArgsConstructor
public class FWUserDTORequest {
    @NotEmpty(message = "FW: username field cannot be empty.")
    private String username;
    private String password;
    @NotBlank(message = "This field can't leave blank.")
    private String email;

    public FWUser toEntity() {
//        return new FWUser(
//                this.getUsername(),
//                this.getPassword(),
//                this.getEmail()
//        );
        return FWUser.builder().build();
    }
}
