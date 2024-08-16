package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long idVehicle;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<Characteristic> characteristicsList;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicle_type_id_vehicle_type")
    private VehicleType vehicleType;
    private Double pricePerDay;
    private String details;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<Image> imagesList;
    private String model;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idVehicle")
    @JsonIgnore
    private List<Booking> bookings;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idCity")
    private City city;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "vehicle_id")
    @JsonIdentityReference(alwaysAsId = true)
    private List<UsagePolicy> usagePoliciesList;
    @Column(unique = true)
    private String vehiclePlate;
}
