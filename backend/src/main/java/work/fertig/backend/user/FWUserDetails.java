package work.fertig.backend.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class FWUserDetails implements UserDetails {

    private FWUser fw_user;

    public FWUserDetails(FWUser fw_user) {
        this.fw_user = fw_user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        fw_user.getRoles().stream().map(role -> authorities.add(new SimpleGrantedAuthority(role.getName())));
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return fw_user.getPassword();
    }

    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return fw_user.getUsername();
    }

    public Long getId() {
        return fw_user.getId();
    }

    public String getEmail() {
        return fw_user.getEmail();
    }
}
