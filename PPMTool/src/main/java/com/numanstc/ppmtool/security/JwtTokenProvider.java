package com.numanstc.ppmtool.security;

import io.jsonwebtoken.*;
import com.numanstc.ppmtool.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.numanstc.ppmtool.security.SecurityConstants.EXPIRATION_TIME;
import static com.numanstc.ppmtool.security.SecurityConstants.SECRET;

@Component
public class JwtTokenProvider {

    // Generate the token
    public String generateToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());

        Date expiryDate = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", (Long.toString(user.getId())));
        claims.put("username", user.getUsername());
        claims.put("fullName", user.getFullName());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }


    // Validate the token
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        } catch (SignatureException exception) {
            System.out.println("Invalid JWT Signature && SignatureException");
        } catch (MalformedJwtException exception) {
            System.out.println("Invalid JWT token && MalformedJwtException");
        } catch (ExpiredJwtException exception) {
            System.out.println("Expired JWT Exception && ExpiredJwtException");
        } catch (UnsupportedJwtException exception) {
            System.out.println("Unsupported JWT Exception && UnsupportedJwtException");
        } catch (IllegalArgumentException exception) {
            System.out.println("JWT claims string is empty && IllegalArgumentException");
        }
        return false;
    }

    // Get userId from the token
    public Long getUserIdFromJwt(String token) {
//        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
//        return Long.parseLong((String) claims.get("id"));
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String id = (String)claims.get("id");

        return Long.parseLong(id);
    }
}
