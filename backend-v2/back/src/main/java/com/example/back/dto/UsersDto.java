package com.example.back.dto;

public class UsersDto {

    private Long idUsers;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Long idRoles;

    public UsersDto() {
    }

    public UsersDto(Long idUsers, String firstName, String lastName, String email, String password, Long idRoles) {
        this.idUsers = idUsers;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.idRoles = idRoles;
    }

    public Long getIdUsers() {
        return idUsers;
    }

    public void setIdUsers(Long idUsers) {
        this.idUsers = idUsers;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getIdRoles() {
        return idRoles;
    }

    public void setIdRoles(Long idRoles) {
        this.idRoles = idRoles;
    }
}
