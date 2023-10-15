package work.fertig.backend.project.models;

import jakarta.persistence.*;
import lombok.*;
import work.fertig.backend.base.BaseEntity;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Project extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private Boolean isArchived;

    @OneToOne(mappedBy = "project")
    private ProjectUsers projectUsers;
}
