package com.example.back.dto;

import com.example.back.entity.Vehicle;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long id;
    private LocalDate startDate;
    private LocalDate endDate;
    private Vehicle vehicle;
    private Long userId;
}
