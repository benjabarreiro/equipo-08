package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy/MM/dd")
    private LocalDate endDate;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idVehicle")
    private Vehicle vehicle;
    private Long userId;
}
