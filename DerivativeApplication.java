package com.example.derivative;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Scanner;

@SpringBootApplication
public class DerivativeApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(DerivativeApplication.class, args);
    }

    @Override
    public void run(String... args) {
        Scanner scanner = new Scanner(System.in, "UTF-8");
        RestTemplate restTemplate = new RestTemplate();

        System.out.println("\n" + "=".repeat(45));

        System.out.print("Введіть функцію (наприклад, x^2-2x): ");
        String expression = scanner.nextLine();

        String url = "https://newton.vercel.app/api/v2/derive/{expression}";

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> response = restTemplate.getForObject(url, Map.class, expression);

            if (response != null && response.containsKey("result")) {
                System.out.println("\n>>> Результат:");
                System.out.println("Функція: " + response.get("expression"));
                System.out.println("Похідна:      " + response.get("result"));
            } else {
                System.out.println("\nПомилка: API повернуло порожню або некоректну відповідь.");
            }

        } catch (Exception e) {
            System.err.println("\nСталася помилка при запиті до API: " + e.getMessage());
            System.err.println("Перевірте підключення до інтернету або формат введеної функції.");
        }

        System.out.println("=".repeat(45));
    }
}