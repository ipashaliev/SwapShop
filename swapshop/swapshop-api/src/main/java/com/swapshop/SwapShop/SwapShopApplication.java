package com.swapshop.SwapShop;

import com.swapshop.SwapShop.services.ImageService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.Resource;

@SpringBootApplication()
public class SwapShopApplication implements CommandLineRunner {
	@Resource
	ImageService imageService;

	public static void main(String[] args) {
		SpringApplication.run(SwapShopApplication.class, args);

	}

	@Override
	public void run(String... args) throws Exception {
		imageService.init();
	}
}
