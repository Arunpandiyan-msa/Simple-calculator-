package com.example.calculator.controller;

import com.example.calculator.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CalculatorController {

    private final CalculatorService calculatorService;

    @Autowired
    public CalculatorController(CalculatorService calculatorService) {
        this.calculatorService = calculatorService;
    }

    @GetMapping("/calculate")
    public ResponseEntity<?> calculate(
            @RequestParam double num1,
            @RequestParam double num2,
            @RequestParam String operator) {
        try {
            double result = calculatorService.calculate(num1, num2, operator);
            return ResponseEntity.ok(Map.of("result", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
