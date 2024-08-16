package com.example.back.service;

import com.example.back.dto.UsersDto;
import com.example.back.entity.Users;
import com.example.back.exception.AlreadyExistsInDataBaseException;
import com.example.back.exception.InvalidValuesException;
import com.example.back.exception.MissingValuesException;
import com.example.back.repository.RolRepository;
import com.example.back.repository.UsersRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UsersServiceTest {

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private RolRepository rolRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UsersService usersService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_MissingValues_ThrowsMissingValuesException() {
        // Arrange
        UsersDto usersDto = new UsersDto();

        // Act & Assert
        assertThrows(MissingValuesException.class, () -> usersService.saveUser(usersDto));

        verifyNoInteractions(rolRepository, passwordEncoder, usersRepository);
    }

    @Test
    void findUsersById_ExistingId_ReturnsOptionalWithUser() {
        // Arrange
        Long userId = 1L;
        Users user = new Users();
        user.setIdUsers(userId);

        when(usersRepository.findById(userId)).thenReturn(Optional.of(user));

        // Act
        Optional<Users> optionalUser = usersService.findUsersById(userId);

        // Assert
        assertTrue(optionalUser.isPresent());
        assertEquals(user, optionalUser.get());

        verify(usersRepository).findById(userId);
    }

    @Test
    void findUsersById_NonExistingId_ReturnsOptionalEmpty() {
        // Arrange
        Long userId = 1L;

        when(usersRepository.findById(userId)).thenReturn(Optional.empty());

        // Act
        Optional<Users> optionalUser = usersService.findUsersById(userId);

        // Assert
        assertFalse(optionalUser.isPresent());

        verify(usersRepository).findById(userId);
    }

    @Test
    void findAllUsers_ReturnsListOfUsers() {
        // Arrange
        List<Users> userList = new ArrayList<>();
        userList.add(new Users());
        userList.add(new Users());

        when(usersRepository.findAll()).thenReturn(userList);

        // Act
        List<Users> users = usersService.findAllUsers();

        // Assert
        assertNotNull(users);
        assertEquals(userList, users);

        verify(usersRepository).findAll();
    }

    @Test
    void findByEmailUser_ExistingEmail_ReturnsUser() {
        // Arrange
        String email = "john.doe@example.com";
        Users user = new Users();
        user.setEmail(email);

        when(usersRepository.findByEmailUser(email)).thenReturn(user);

        // Act
        Users foundUser = usersService.findByEmailUser(email);

        // Assert
        assertNotNull(foundUser);
        assertEquals(user, foundUser);

        verify(usersRepository).findByEmailUser(email);
    }

    @Test
    void findByEmailUser_NonExistingEmail_ReturnsNull() {
        // Arrange
        String email = "john.doe@example.com";

        when(usersRepository.findByEmailUser(email)).thenReturn(null);

        // Act
        Users foundUser = usersService.findByEmailUser(email);

        // Assert
        assertNull(foundUser);

        verify(usersRepository).findByEmailUser(email);
    }

    @Test
    void checkIfMissingValues_AllValuesPresent_NoExceptionThrown() {
        // Arrange
        Users users = new Users();
        users.setName("John");
        users.setLastname("Doe");
        users.setEmail("john.doe@example.com");
        users.setPassword("password");

        // Act & Assert
        assertDoesNotThrow(() -> usersService.checkIfMissingValues(users, "Test Process"));
    }

    @Test
    void checkIfMissingValues_MissingValues_ThrowsMissingValuesException() {
        // Arrange
        Users users = new Users();
        users.setEmail("john.doe@example.com");

        // Act & Assert
        assertThrows(MissingValuesException.class, () -> usersService.checkIfMissingValues(users, "Test Process"));
    }

    @Test
    void checkUserAndPasswordFormat_ValidValues_NoExceptionThrown() {
        // Arrange
        Users users = new Users();
        users.setEmail("john.doe@example.com");
        users.setPassword("password");

        // Act & Assert
        assertDoesNotThrow(() -> usersService.checkUserAndPasswordFormat(users));
    }

    @Test
    void checkUserAndPasswordFormat_InvalidValues_ThrowsInvalidValuesException() {
        // Arrange
        Users users = new Users();
        users.setEmail("invalidemail");
        users.setPassword("pass");

        // Act & Assert
        assertThrows(InvalidValuesException.class, () -> usersService.checkUserAndPasswordFormat(users));
    }

    @Test
    void validateNewUser_AllValid_NoExceptionThrown() throws MissingValuesException, InvalidValuesException, AlreadyExistsInDataBaseException {
        // Arrange
        Users users = new Users();
        users.setName("John");
        users.setLastname("Doe");
        users.setEmail("john.doe@example.com");
        users.setPassword("password");

        when(usersRepository.findByEmailUser(users.getEmail())).thenReturn(null);

        // Act & Assert
        assertDoesNotThrow(() -> usersService.validateNewUser(users));

        verify(usersRepository).findByEmailUser(users.getEmail());
    }

    @Test
    void validateNewUser_MissingValues_ThrowsMissingValuesException() {
        // Arrange
        Users users = new Users();
        users.setEmail("john.doe@example.com");

        // Act & Assert
        assertThrows(MissingValuesException.class, () -> usersService.validateNewUser(users));

        verifyNoInteractions(usersRepository);
    }
}
