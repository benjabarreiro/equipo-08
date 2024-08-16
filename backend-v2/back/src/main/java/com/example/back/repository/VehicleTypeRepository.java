package com.example.back.repository;

import com.example.back.entity.VehicleType;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface VehicleTypeRepository extends JpaRepository<VehicleType, Long> {
}
