package com.example.back.dto;

public class CharacteristicDto {

    private Long idCharacteristic;
    private String title;

    public CharacteristicDto(Long idCharacteristic, String title) {
        this.idCharacteristic = idCharacteristic;
        this.title = title;
    }

    public CharacteristicDto() {}

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
