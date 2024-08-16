package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idRoles", nullable = false)
    private Long idRoles;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "idRoles")
    @JsonBackReference
    private List<Users> users;

    public Roles() {
    }

    public Roles(Long idRoles, String name, List<Users> users) {
        this.idRoles = idRoles;
        this.name = name;
        this.users = users;
    }

    public Long getIdRoles() {
        return idRoles;
    }

    public void setIdRoles(Long idRoles) {
        this.idRoles = idRoles;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Users> getUsers() {
        return users;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }
}
