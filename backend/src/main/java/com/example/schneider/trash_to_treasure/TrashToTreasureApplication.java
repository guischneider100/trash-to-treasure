package com.example.schneider.trash_to_treasure;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TrashToTreasureApplication {

	public static void main(String[] args) {

		//It loads the .env variables
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();

		//Define the variable for the runtime
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));
		System.setProperty("POSTGRES_DB", dotenv.get("POSTGRES_DB"));
		System.setProperty("POSTGRES_USER", dotenv.get("POSTGRES_USER"));
    	System.setProperty("POSTGRES_PASSWORD", dotenv.get("POSTGRES_PASSWORD"));

		SpringApplication.run(TrashToTreasureApplication.class, args);

		System.out.println("");
		System.out.println("*** TRASH TO TREASURE APPLICATION IS RUNNING ***");
		System.out.println("");
	}

}
