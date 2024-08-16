package com.example.back.service;

import com.example.back.dto.ProvinceDto;
import com.example.back.entity.Province;
import com.example.back.exception.MissingValuesException;
import com.example.back.exception.NotInDataBaseException;
import com.example.back.repository.ProvinceRepository;
import lombok.SneakyThrows;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProvinceServiceTest {
    @Mock
    private ProvinceRepository provinceRepository;

    @InjectMocks
    private ProvinceService provinceService;

    @SneakyThrows
    @Test
    void addProvince_ValidProvinceDto_ProvinceSaved() {
        // Arrange
        ProvinceDto provinceDto = new ProvinceDto();
        provinceDto.setProvinceName("Test Province");

        Province provinceEntity = new Province();
        provinceEntity.setIdProvince(1L);
        provinceEntity.setProvinceName("Test Province");

        when(provinceRepository.save(any(Province.class))).thenReturn(provinceEntity);

        // Act
        Province result = provinceService.addProvince(provinceDto);

        // Assert
        assertNotNull(result);
        assertEquals(provinceEntity.getIdProvince(), result.getIdProvince());
        assertEquals(provinceEntity.getProvinceName(), result.getProvinceName());

        verify(provinceRepository, times(1)).save(any(Province.class));
    }

    @Test
    void addProvince_MissingValues_ThrowsMissingValuesException() {
        // Arrange
        ProvinceDto provinceDto = new ProvinceDto();

        // Act & Assert
        assertThrows(MissingValuesException.class, () -> provinceService.addProvince(provinceDto));

        verifyNoInteractions(provinceRepository);
    }

    @Test
    void deleteProvinceById_ExistingId_ProvinceDeleted() throws NotInDataBaseException {
        // Arrange
        Long idProvince = 1L;

        when(provinceRepository.existsById(idProvince)).thenReturn(true);

        // Act
        provinceService.deleteProvinceById(idProvince);

        // Assert
        verify(provinceRepository, times(1)).existsById(idProvince);
        verify(provinceRepository, times(1)).deleteById(idProvince);
    }

    @Test
    void deleteProvinceById_NonExistingId_ThrowsNotInDataBaseException() {
        // Arrange
        Long idProvince = 1L;

        when(provinceRepository.existsById(idProvince)).thenReturn(false);

        // Act & Assert
        assertThrows(NotInDataBaseException.class, () -> provinceService.deleteProvinceById(idProvince));

        verify(provinceRepository, times(1)).existsById(idProvince);
        verifyNoMoreInteractions(provinceRepository);
    }

    @Test
    void listAllProvinces_ProvincesExist_ReturnsListOfProvinces() {
        // Arrange
        List<Province> provinceList = new ArrayList<>();
        Province province1 = new Province();
        province1.setIdProvince(1L);
        province1.setProvinceName("Test Province 1");
        Province province2 = new Province();
        province2.setIdProvince(2L);
        province2.setProvinceName("Test Province 2");
        provinceList.add(province1);
        provinceList.add(province2);

        when(provinceRepository.findAll()).thenReturn(provinceList);

        // Act
        List<Province> result = provinceService.listAllProvinces();

        // Assert
        assertNotNull(result);
        assertEquals(provinceList.size(), result.size());
        assertEquals(provinceList, result);

        verify(provinceRepository, times(1)).findAll();
    }

    @Test
    void listAllProvinces_NoProvincesExist_ReturnsEmptyList() {
        // Arrange
        when(provinceRepository.findAll()).thenReturn(Collections.emptyList());

        // Act
        List<Province> result = provinceService.listAllProvinces();

        // Assert
        assertNotNull(result);
        assertTrue(result.isEmpty());

        verify(provinceRepository, times(1)).findAll();
    }

    @Test
    void dtoToEntity_ValidDto_ReturnsEntity() {
        // Arrange
        ProvinceDto provinceDto = new ProvinceDto();
        provinceDto.setIdProvince(1L);
        provinceDto.setProvinceName("Test Province");

        // Act
        Province result = provinceService.dtoToEntity(provinceDto);

        // Assert
        assertNotNull(result);
        assertEquals(provinceDto.getIdProvince(), result.getIdProvince());
        assertEquals(provinceDto.getProvinceName(), result.getProvinceName());
    }

    @Test
    void entityToDto_ValidEntity_ReturnsDto() {
        // Arrange
        Province provinceEntity = new Province();
        provinceEntity.setIdProvince(1L);
        provinceEntity.setProvinceName("Test Province");

        // Act
        ProvinceDto result = provinceService.entityToDto(provinceEntity);

        // Assert
        assertNotNull(result);
        assertEquals(provinceEntity.getIdProvince(), result.getIdProvince());
        assertEquals(provinceEntity.getProvinceName(), result.getProvinceName());
    }

    @Test
    void checkIfMissingValues_ProvinceWithMissingValues_ThrowsMissingValuesException() {
        // Arrange
        Province province = new Province();
        province.setIdProvince(1L);
        province.setProvinceName(null);

        // Act & Assert
        assertThrows(MissingValuesException.class, () -> provinceService.checkIfMissingValues(province, "Create: "));

        province.setProvinceName("");
        assertThrows(MissingValuesException.class, () -> provinceService.checkIfMissingValues(province, "Create: "));
    }

    @Test
    void checkIfMissingValues_ProvinceWithAllValues_DoesNotThrowException() {
        // Arrange
        Province province = new Province();
        province.setIdProvince(1L);
        province.setProvinceName("Test Province");

        // Act & Assert
        assertDoesNotThrow(() -> provinceService.checkIfMissingValues(province, "Create: "));
    }

    @Test
    void existsById_ExistingId_DoesNotThrowException() {
        // Arrange
        Long idProvince = 1L;

        when(provinceRepository.existsById(idProvince)).thenReturn(true);

        // Act & Assert
        assertDoesNotThrow(() -> provinceService.existsById(idProvince, "Find by ID: "));
    }

    @Test
    void existsById_NonExistingId_ThrowsNotInDataBaseException() {
        // Arrange
        Long idProvince = 1L;

        when(provinceRepository.existsById(idProvince)).thenReturn(false);

        // Act & Assert
        assertThrows(NotInDataBaseException.class, () -> provinceService.existsById(idProvince, "Find by ID: "));
    }
}