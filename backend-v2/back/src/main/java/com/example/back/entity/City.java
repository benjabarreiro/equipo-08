package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idCity;
    private String cityName;
    private String latitud;
    private String longitud;

    @ManyToOne(fetch = FetchType.EAGER)
    private Province province;

    @ManyToOne(fetch = FetchType.EAGER)
    private Country country;
}
