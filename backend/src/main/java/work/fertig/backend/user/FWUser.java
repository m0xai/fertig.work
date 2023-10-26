package work.fertig.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import work.fertig.backend.base.BaseEntity;

import java.util.Collection;

@Entity
@Table(name = "fw_user") // table user is for postgres reserved
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class FWUser extends BaseEntity {
    // NOTE: @Data shouldn't be placed at an entity,
    //  see: https://thorben-janssen.com/lombok-hibernate-how-to-avoid-common-pitfalls/
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Username field can't leave blank.")
    private String username;

    @Column(nullable = false)
    @NotBlank(message = "Password field can't leave blank.")
    private String password;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "This  field can't leave blank.")
    @Email(message = "Email should be a valid address.")
    private String email;

    @ManyToMany
    @JoinTable(name = "fw_user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;
}
