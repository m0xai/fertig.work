package work.fertig.backend.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.stereotype.Component;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@Builder
@Component
public class FWUserDTOResponse implements FWUserDTO {
    private Long id;
    private String username;
    private String email;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    private FWUserDTOResponse() {
    }

    public static FWUserDTOResponse fromEntity(FWUser fwUser) {
        return FWUserDTOResponse.builder()
                .id(fwUser.getId())
                .username(fwUser.getUsername())
                .email(fwUser.getEmail())
                .createdAt(fwUser.getCreatedAt())
                .updatedAt(fwUser.getUpdatedAt())
                .build();
    }
}
