package com.example.back.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "characteristic")
public class Characteristic {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long idCharacteristic;
    private String title;

    public Characteristic() {
    }

    public Characteristic(Long idCharacteristic, String title) {
        this.idCharacteristic = idCharacteristic;
        this.title = title;
    }

    public Long getIdCharacteristic() {
        return idCharacteristic;
    }

    public void setIdCharacteristic(Long idCharacteristic) {
        this.idCharacteristic = idCharacteristic;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
