package com.example.back.dto;

import com.example.back.entity.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VehicleDto {
    private Long idVehicle;
    private List<Characteristic> characteristicsList;
    private VehicleType vehicleType;
    private Double pricePerDay;
    private String details;
    private List<Image> imagesList;
    private String model;
    private City city;
    private List<UsagePolicy> usagePoliciesList;
    private String vehiclePlate;
}
