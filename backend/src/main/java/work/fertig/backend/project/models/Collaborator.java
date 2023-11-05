package work.fertig.backend.project.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Collaborator extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @OneToOne
    @JoinColumn(name = "fw_user", referencedColumnName = "id")
    private FWUser user;

    @OneToOne
    @JoinColumn(name = "project", referencedColumnName = "id")
    private Project project;

    private String role;
    private Boolean isJoined;
    private Timestamp joinedOn;
    private Boolean isInvited;
    private Timestamp invitedOn;
    // TODO: Add also isLeft and leftOn fields

    public Collaborator() {
    }
}
