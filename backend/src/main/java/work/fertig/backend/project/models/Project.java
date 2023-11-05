package work.fertig.backend.project.models;

import jakarta.persistence.*;
import lombok.*;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private Boolean isArchived;
    private String color;
    private Timestamp startOn;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "created_by")
    private FWUser createdBy;

    // NOTE: We don't need collaborators here exactly. We can have custom JPA functions toa get them
    // private List<Collaborator> collaborators
}
