package com.joy.portfolio.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

import com.joy.portfolio.filters.JWTAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	private final AuthenticationProvider authenticationProvider;
	private final CorsConfigurationSource corsConfigurationSource;
	private final JWTAuthenticationFilter jwtAuthenticationFilter;

	public SecurityConfiguration(JWTAuthenticationFilter jwtAuthenticationFilter,
			AuthenticationProvider authenticationProvider, CorsConfigurationSource corsConfigurationSource) {
		this.authenticationProvider = authenticationProvider;
		this.corsConfigurationSource = corsConfigurationSource;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(cors -> cors.configurationSource(corsConfigurationSource)).csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll()
						.requestMatchers("/swagger-ui/**").permitAll().requestMatchers("/v3/api-docs/**").permitAll()
						.requestMatchers("/user/portfolio/**").permitAll().anyRequest().authenticated())
				.sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
}
