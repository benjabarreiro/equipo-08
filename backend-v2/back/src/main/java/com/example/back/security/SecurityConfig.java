package com.example.back.security;

import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.autoconfigure.security.reactive.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private static final Logger LOGGER = LogManager.getLogger(SecurityConfig.class);

    private final UserDetailsService userDetailsService;

    private JWTAuthorizationFilter authorizationFilter;

    private PasswordEncoder passwordEncoder;

    public static final String GET = "GET";
    public static final String HEAD = "HEAD";
    public static final String POST = "POST";
    public static final String PUT = "PUT";
    public static final String DELETE = "DELETE";


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {

        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter();
        jwtAuthenticationFilter.setAuthenticationManager(authManager);
        jwtAuthenticationFilter.setFilterProcessesUrl("/login");

        return http
                .cors().and()
                .csrf().disable()
                .authorizeRequests()
                .requestMatchers(new AntPathRequestMatcher (String.valueOf(PathRequest.toStaticResources().atCommonLocations()))).permitAll()

                // VEHICLE
                .requestMatchers(new AntPathRequestMatcher("/vehicle/**", POST)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/vehicle/**", PUT)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/vehicle/**", DELETE)).authenticated()

                // VEHICLE TYPES
                .requestMatchers(new AntPathRequestMatcher("/vehicleType/**", POST)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/vehicleType/**", PUT)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/vehicleType/**", DELETE)).authenticated()

                // CHARACTERISTICS
                .requestMatchers(new AntPathRequestMatcher("/characteristic/**", POST)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/characteristic/**", PUT)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/characteristic/**", DELETE)).authenticated()

                // IMAGES
                .requestMatchers(new AntPathRequestMatcher("/image/**", POST)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/image/**", DELETE)).authenticated()

                // USERS
                .requestMatchers(new AntPathRequestMatcher("/users/ascendToAdmin", PUT)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/users/list", GET)).authenticated()
                .requestMatchers(new AntPathRequestMatcher("/users/findByEmail/**", GET)).authenticated()


                .anyRequest().permitAll()
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
//                .logout().clearAuthentication(true)
//                .logoutSuccessUrl("/")
//                .deleteCookies("JSESSIONID")
//                .invalidateHttpSession(true)
//                .and()
                .addFilter(jwtAuthenticationFilter)
                .addFilterBefore(authorizationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    AuthenticationManager authManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder)
                .and()
                .build();
    }

}
