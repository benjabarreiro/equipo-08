package com.example.back.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class Users {
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        private Long idUsers;
        private String name;
        private String lastname;
        private String email;
        private String password;
        @ManyToOne(fetch = FetchType.EAGER)
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
        @JoinColumn(name = "idRoles")
        private Roles roles;

        public Users() {
        }

        public Users(Long idUsers, String name, String lastname, String email, String password, Roles roles) {
                this.idUsers = idUsers;
                this.name = name;
                this.lastname = lastname;
                this.email = email;
                this.password = password;
                this.roles = roles;
        }

        public Long getIdUsers() {
                return idUsers;
        }

        public void setIdUsers(Long idUsers) {
                this.idUsers = idUsers;
        }

        public String getName() {
                return name;
        }

        public void setName(String name) {
                this.name = name;
        }

        public String getLastname() {
                return lastname;
        }

        public void setLastname(String lastname) {
                this.lastname = lastname;
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

        public Roles getRoles() {
                return roles;
        }

        public void setRoles(Roles roles) {
                this.roles = roles;
        }
}
