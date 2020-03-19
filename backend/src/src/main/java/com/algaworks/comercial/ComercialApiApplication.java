package com.algaworks.comercial;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;

@SpringBootApplication
public class ComercialApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ComercialApiApplication.class, args);
	}

}
