package com.example.back.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "vehicle_type")
public class VehicleType {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long idVehicleType;
    private String title;
    private String details;
    @OneToOne
    @JoinColumn(name = "image_id_image")
    private Image image;

    public VehicleType() {
    }

    public VehicleType(Long idVehicleType, String title, String details, Image image) {
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
