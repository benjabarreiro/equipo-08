package com.example.back.service;

import com.example.back.dto.VehicleTypeDto;
import com.example.back.entity.Image;
import com.example.back.entity.VehicleType;
import com.example.back.exception.MissingValuesException;
import com.example.back.exception.NotInDataBaseException;
import com.example.back.repository.VehicleTypeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class VehicleTypeServiceTest {

    @Mock
    private VehicleTypeRepository vehicleTypeRepository;

    @Mock
    private ImageService imageService;

    @InjectMocks
    private VehicleTypeService vehicleTypeService;

    @Test
    void testAddVehicleType_Successful() throws MissingValuesException, NotInDataBaseException {
        // Arrange
        VehicleTypeDto vehicleTypeDto = new VehicleTypeDto();
        vehicleTypeDto.setTitle("Test Title");
        vehicleTypeDto.setDetails("Test Details");
        Image image = new Image();
        vehicleTypeDto.setImage(image);

        // Act + Assert
        assertThrows(MissingValuesException.class, () -> vehicleTypeService.addVehicle(vehicleTypeDto));

        // Verify the interactions
        verify(vehicleTypeRepository, times(0)).save(any(VehicleType.class));
        verifyNoMoreInteractions(vehicleTypeRepository);
    }

    @Test
    void testAddVehicleType_MissingValuesException() {
        // Arrange
        VehicleTypeDto vehicleTypeDto = new VehicleTypeDto();
        vehicleTypeDto.setTitle("");
        vehicleTypeDto.setDetails("Test Details");
        vehicleTypeDto.setImage(new Image());

        // Act + Assert
        assertThrows(MissingValuesException.class, () -> vehicleTypeService.addVehicle(vehicleTypeDto));
    }

    @Test
    void testFindVehicleTypeById_Successful() throws NotInDataBaseException {
        // Arrange
        Long vehicleTypeId = 1L;
        VehicleType vehicleType = new VehicleType();
        vehicleType.setIdVehicleType(vehicleTypeId);

        when(vehicleTypeRepository.existsById(vehicleTypeId)).thenReturn(true);
        when(vehicleTypeRepository.findById(vehicleTypeId)).thenReturn(Optional.of(vehicleType));

        // Act
        VehicleType result = vehicleTypeService.findVehicleTypeById(vehicleTypeId);

        // Assert
        assertNotNull(result);
        assertEquals(vehicleTypeId, result.getIdVehicleType());

        // Verify interactions
        verify(vehicleTypeRepository, times(1)).existsById(vehicleTypeId);
        verify(vehicleTypeRepository, times(1)).findById(vehicleTypeId);
        verifyNoMoreInteractions(vehicleTypeRepository);
    }

    @Test
    void testUpdateVehicleTypeById_NotInDataBaseException() {
        // Arrange
        Long vehicleTypeId = 1L;
        VehicleTypeDto updatedVehicleTypeDto = new VehicleTypeDto();

        // Act
        when(vehicleTypeRepository.existsById(vehicleTypeId)).thenReturn(false);

        // Assert
        assertThrows(NotInDataBaseException.class, () -> vehicleTypeService.updateVehicleTypeById(updatedVehicleTypeDto, vehicleTypeId));
    }

    @Test
    void testDeleteVehicleType_Successful() throws NotInDataBaseException {
        // Arrange
        Long vehicleTypeId = 1L;

        // Act
        when(vehicleTypeRepository.existsById(vehicleTypeId)).thenReturn(true);

        // Assert
        assertDoesNotThrow(() -> vehicleTypeService.deleteVehicleType(vehicleTypeId));

        // Verify the interactions
        verify(vehicleTypeRepository, times(1)).existsById(vehicleTypeId);
        verify(vehicleTypeRepository, times(1)).deleteById(vehicleTypeId);
        verifyNoMoreInteractions(vehicleTypeRepository);
    }

    @Test
    void testDeleteVehicleType_NotInDataBaseException() {
        // Arrange
        Long vehicleTypeId = 1L;

        // Act
        when(vehicleTypeRepository.existsById(vehicleTypeId)).thenReturn(false);

        // Assert
        assertThrows(NotInDataBaseException.class, () -> vehicleTypeService.deleteVehicleType(vehicleTypeId));
    }

    @Test
    void testListAllVehicleTypes() {
        // Arrange
        VehicleType vehicleType1 = new VehicleType();
        VehicleType vehicleType2 = new VehicleType();
        List<VehicleType> vehicleTypes = Arrays.asList(vehicleType1, vehicleType2);

        when(vehicleTypeRepository.findAll()).thenReturn(vehicleTypes);

        // Act
        List<VehicleType> result = vehicleTypeService.listAllVehicleTypes();

        // Assert
        assertNotNull(result);
        assertEquals(vehicleTypes.size(), result.size());
        assertTrue(result.contains(vehicleType1));
        assertTrue(result.contains(vehicleType2));
        verify(vehicleTypeRepository, times(1)).findAll();
        verifyNoMoreInteractions(vehicleTypeRepository);
    }


    @Test
    void testCopyAllNotNullValues_OnlyTitle() {
        // Arrange
        VehicleType existingVehicleType = new VehicleType();
        existingVehicleType.setIdVehicleType(1L);
        existingVehicleType.setTitle("Sedan");
        existingVehicleType.setDetails("Four-door car");

        VehicleType newVehicleType = new VehicleType();
        newVehicleType.setTitle("Hatchback");


        // Act
        VehicleType updatedVehicleType = vehicleTypeService.copyAllNotNullValues(newVehicleType, existingVehicleType);

        // Assert
        assertNotNull(updatedVehicleType);
        assertEquals(1L, updatedVehicleType.getIdVehicleType());
        assertEquals("Hatchback", updatedVehicleType.getTitle());
        assertEquals("Four-door car", updatedVehicleType.getDetails());
    }

    @Test
    void testCopyAllNotNullValues() {
        // Arrange
        VehicleType existingVehicleType = new VehicleType();
        existingVehicleType.setIdVehicleType(1L);
        existingVehicleType.setTitle("Sedan");
        existingVehicleType.setDetails("Four-door car");

        Image mockedImage1 = mock(Image.class);
        existingVehicleType.setImage(mockedImage1);
        Image mockedImage2 = mock(Image.class);
        existingVehicleType.setImage(mockedImage2);

        VehicleType newVehicleType = new VehicleType();
        newVehicleType.setTitle("Hatchback");
        newVehicleType.setDetails("Three-door car");
        newVehicleType.setImage(mockedImage2);

        // Act
        VehicleType updatedVehicleType = vehicleTypeService.copyAllNotNullValues(newVehicleType, existingVehicleType);

        // Assert
        assertNotNull(updatedVehicleType);
        assertEquals(1L, updatedVehicleType.getIdVehicleType());
        assertEquals("Hatchback", updatedVehicleType.getTitle());
        assertEquals("Three-door car", updatedVehicleType.getDetails());
        assertEquals(mockedImage2, updatedVehicleType.getImage()); // Verify that the image is copied
    }

    @Test
    void testCopyAllNotNullValues_NullExistingVehicleType() {
        // Arrange
        VehicleType existingVehicleType = null;
        VehicleType newVehicleType = new VehicleType();
        newVehicleType.setTitle("Hatchback");
        newVehicleType.setDetails("Compact car");

        // Act and Assert
        assertThrows(NullPointerException.class, () -> {
            vehicleTypeService.copyAllNotNullValues(newVehicleType, existingVehicleType);
        });
    }

    @Test
    void testCopyAllNotNullValues_NullNewVehicleType() {
        // Arrange
        VehicleType existingVehicleType = new VehicleType();
        VehicleType newVehicleType = null;
        existingVehicleType.setTitle("Hatchback");
        existingVehicleType.setDetails("Compact car");

        // Act and Assert
        assertThrows(NullPointerException.class, () -> {
            vehicleTypeService.copyAllNotNullValues(newVehicleType, existingVehicleType);
        });
    }

    @Test
    void testCopyAllNotNullValues_BothNull() {
        // Arrange
        VehicleType existingVehicleType = null;
        VehicleType newVehicleType = null;

        // Act and Assert
        assertThrows(NullPointerException.class, () -> {
            vehicleTypeService.copyAllNotNullValues(newVehicleType, existingVehicleType);
        });
    }

    @Test
    void testEntityToDto() {
        // Arrange
        VehicleType vehicleTypeEntity = new VehicleType();
        vehicleTypeEntity.setIdVehicleType(1L);
        vehicleTypeEntity.setTitle("Sedan");
        vehicleTypeEntity.setDetails("Four-door car");

        Image image = new Image();
        vehicleTypeEntity.setImage(image);

        // Act
        VehicleTypeDto vehicleTypeDto = vehicleTypeService.entityToDto(vehicleTypeEntity);

        // Assert
        assertNotNull(vehicleTypeDto);
        assertEquals(vehicleTypeEntity.getIdVehicleType(), vehicleTypeDto.getIdVehicleType());
        assertEquals(vehicleTypeEntity.getTitle(), vehicleTypeDto.getTitle());
        assertEquals(vehicleTypeEntity.getDetails(), vehicleTypeDto.getDetails());
        assertEquals(vehicleTypeEntity.getImage(), vehicleTypeDto.getImage());
    }
}
