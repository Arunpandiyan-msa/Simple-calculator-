package com.example.calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double calculate(double num1, double num2, String operator) {
        switch (operator) {
            case "add":
                return num1 + num2;
            case "subtract":
                return num1 - num2;
            case "multiply":
                return num1 * num2;
            case "divide":
                if (num2 == 0) {
                    throw new IllegalArgumentException("Cannot divide by zero");
                }
                return num1 / num2;
            default:
                throw new IllegalArgumentException("Invalid operator: " + operator);
        }
    }
}
