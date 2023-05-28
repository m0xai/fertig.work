package work.fertig.backend.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import work.fertig.backend.user.FWUserDetailsService;

@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  JwtAuthService jwtAuthService;

  @Autowired
  FWUserDetailsService userDetailsService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    final String authorizationHeader = request.getHeader("Authorization");

    String username = null;
    String jwt = null;

    // TODO: Add Fif clause to hit Authorization without Bearer to deactivate Basic
    // Auth

    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
      jwt = authorizationHeader.substring(7);
      try {
        username = jwtAuthService.extractUsername(jwt);
      } catch (ExpiredJwtException e) {
        System.out.println(e.toString());
      }
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      System.out.println("JwtAuthenticationFilter.doFilterInternal() working!");
      UserDetails userDetails = userDetailsService.loadUserByUsername(username);

      if (jwtAuthService.validateToken(jwt, userDetails)) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());

        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
      }
    }

    chain.doFilter(request, response);
  }
}
