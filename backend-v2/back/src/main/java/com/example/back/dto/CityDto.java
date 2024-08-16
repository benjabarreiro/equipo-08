package com.example.back.dto;

import com.example.back.entity.Country;
import com.example.back.entity.Province;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CityDto {
    Long idCity;
    String cityName;
    String latitud;
    String longitud;
    Province province;
    Country country;
}
