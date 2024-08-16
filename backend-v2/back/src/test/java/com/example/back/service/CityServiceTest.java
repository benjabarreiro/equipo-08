package com.example.back.service;

import com.example.back.dto.CityDto;
import com.example.back.dto.ProvinceDto;
import com.example.back.entity.City;
import com.example.back.entity.Country;
import com.example.back.entity.Province;
import com.example.back.exception.MissingValuesException;
import com.example.back.exception.NotInDataBaseException;
import com.example.back.exception.WronglyPopulatedListsException;
import com.example.back.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CityServiceTest {

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private CityService cityService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllCities() {
        // Arrange
        List<City> cities = new ArrayList<>();
        cities.add(new City());
        cities.add(new City());
        when(cityRepository.findAll()).thenReturn(cities);

        // Act
        List<City> result = cityService.listAllCities();

        // Assert
        assertNotNull(result);
        assertEquals(cities.size(), result.size());
        verify(cityRepository, times(1)).findAll();
    }
}
