package com.joy.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.util.unit.DataSize;

import jakarta.servlet.MultipartConfigElement;

@ServletComponentScan
@SpringBootApplication
@ComponentScan(basePackages = {"com.joy.portfolio", "com.portfolio.joy.configs"})
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
	
	@Bean
	MultipartConfigElement multipartConfigElement() {
	    MultipartConfigFactory factory = new MultipartConfigFactory();
	    factory.setMaxFileSize(DataSize.ofMegabytes(10));
	    factory.setMaxRequestSize(DataSize.ofMegabytes(100));
	    return factory.createMultipartConfig();
	}
}