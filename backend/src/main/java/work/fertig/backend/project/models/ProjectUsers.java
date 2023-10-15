package work.fertig.backend.project.models;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.user.FWUser;

import java.util.List;

@Entity
@Table(name = "project_users")
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class ProjectUsers extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    private Project project;

    @Column(name = "invited_users")
    @ManyToMany
    private List<FWUser> invitedUsers;

    @Column(name = "joined_users")
    @ManyToMany
    private List<FWUser> joinedUsers;

    @Column(name = "left_users")
    @ManyToMany
    private List<FWUser> leftUsers;

}
