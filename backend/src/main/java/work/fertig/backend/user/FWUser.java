package work.fertig.backend.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "fw_users") // table user is for postgres reserved
public class FWUser {
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
    @JoinTable(name = "fw_users_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private Collection<Role> roles;

    public FWUser() {
    };

    public FWUser(@NotBlank(message = "Username field can't leave blank.") String username,
            @NotBlank(message = "Password field can't leave blank.") String password,
            @NotBlank(message = "This  field can't leave blank.") @Email(message = "Email should be a valid address.") String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    public Long getId() {
        return this.id;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return this.password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Collection<Role> getRoles() {
        return this.roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }

}
