package com.example.back.repository;

import com.example.back.entity.Province;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface ProvinceRepository extends JpaRepository<Province, Long> {
}
