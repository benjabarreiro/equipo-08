package com.example.back.service;

import com.example.back.dto.ProvinceDto;
import com.example.back.entity.Province;
import com.example.back.exception.MissingValuesException;
import com.example.back.exception.NotInDataBaseException;
import com.example.back.exception.WronglyPopulatedListsException;
import com.example.back.repository.ProvinceRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProvinceService {
    private static final Logger LOGGER = LogManager.getLogger(ProvinceService.class);

    private static final String CREATE = "Create: ";
    private static final String NEW_PROVINCE_CREATED = "New Province created.";
    private static final String FIND_BY_ID = "Find by ID: ";
    private static final String UPDATE = "Update: ";
    private static final String DELETE = "Delete: ";
    private static final String LIST_ALL = "List all: ";
    private static final String PROVINCE_UPDATED_BY_ID = "Province updated by id %s";
    private static final String PROVINCE_DELETED_BY_ID = "Province deleted by id %s";
    private static final String STARTING_PROCESS = "Starting Process ";
    private static final String PROCESS_FINISHED_SUCCESSFULLY = "Process finished successfully";
    private static final String FAILED_BECAUSE = "Failed because: ";
    private static final String MISSING_VALUES = "Missing values: ";
    private static final String PROVINCE_DOES_NOT_EXIST_BY_ID = "Province with id %s does not exist";

    @Autowired
    ProvinceRepository provinceRepository;

    public Province addProvince(ProvinceDto provinceDto) throws MissingValuesException, NotInDataBaseException, WronglyPopulatedListsException {

        LOGGER.info(STARTING_PROCESS + CREATE);

        Province provinceEntity = dtoToEntity(provinceDto);

        checkIfMissingValues(provinceEntity, CREATE);

        LOGGER.info(CREATE + PROCESS_FINISHED_SUCCESSFULLY);
        LOGGER.info(NEW_PROVINCE_CREATED);
        return provinceRepository.save(provinceEntity);
    }

    public Province findProvinceById(Long idProvince) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + FIND_BY_ID);

        existsById(idProvince, FIND_BY_ID);
        return provinceRepository.findById(idProvince).
                orElseThrow(() -> new NotInDataBaseException(String.format(PROVINCE_DOES_NOT_EXIST_BY_ID, idProvince)));
    }

    public Province updateProvince(ProvinceDto updatedProvince, Long idProvinceToUpdate) throws NotInDataBaseException, MissingValuesException {

        LOGGER.info(STARTING_PROCESS + UPDATE);

        existsById(idProvinceToUpdate, UPDATE);

        Province provinceOriginal = findProvinceById(idProvinceToUpdate);

        checkIfMissingValues(dtoToEntity(updatedProvince), UPDATE);
        provinceOriginal.setProvinceName(updatedProvince.getProvinceName());
        provinceOriginal.setIdProvince(idProvinceToUpdate);

        LOGGER.info(String.format(PROVINCE_UPDATED_BY_ID, idProvinceToUpdate));
        return provinceRepository.save(provinceOriginal);
    }

    public void deleteProvinceById(Long idProvince) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + DELETE);

        existsById(idProvince, DELETE);

        LOGGER.info(PROCESS_FINISHED_SUCCESSFULLY + DELETE);
        provinceRepository.deleteById(idProvince);
    }

    public List<Province> listAllProvinces() {

        LOGGER.info(STARTING_PROCESS + LIST_ALL);

        return provinceRepository.findAll();
    }

    public Province dtoToEntity(ProvinceDto provinceDto) {

        Province provinceEntity = new Province();

        provinceEntity.setIdProvince(provinceDto.getIdProvince());
        provinceEntity.setProvinceName(provinceDto.getProvinceName());

        return provinceEntity;
    }

    public ProvinceDto entityToDto(Province provinceEntity) {

        ProvinceDto provinceDto = new ProvinceDto();

        provinceDto.setIdProvince(provinceEntity.getIdProvince());
        provinceDto.setProvinceName(provinceEntity.getProvinceName());

        return provinceDto;
    }

    public void checkIfMissingValues(Province province, String process) throws MissingValuesException {

        if (province.getProvinceName() == null || province.getProvinceName().isBlank()) {
            throw new MissingValuesException(process + FAILED_BECAUSE + MISSING_VALUES);
        }
    }

    public void existsById(Long provinceId, String process) throws NotInDataBaseException {

        if (!provinceRepository.existsById(provinceId)) {
            LOGGER.error(String.format(process, FAILED_BECAUSE, PROVINCE_DOES_NOT_EXIST_BY_ID, provinceId));
            throw new NotInDataBaseException(String.format(process + FAILED_BECAUSE + PROVINCE_DOES_NOT_EXIST_BY_ID, provinceId));
        }
    }
}
