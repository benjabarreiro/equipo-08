package com.example.back.dto;

import com.example.back.entity.Image;

public class VehicleTypeDto {
    private Long idVehicleType;
    private String title;
    private String details;
    private Image image;

    public VehicleTypeDto() {
    }

    public VehicleTypeDto(Long idVehicleType, String title, String details, Image image) {
        this.idVehicleType = idVehicleType;
        this.title = title;
        this.details = details;
        this.image = image;
    }

    public Long getIdVehicleType() {
        return idVehicleType;
    }

    public void setIdVehicleType(Long idVehicleType) {
        this.idVehicleType = idVehicleType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
