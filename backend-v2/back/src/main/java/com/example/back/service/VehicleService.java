package com.example.back.service;

import com.example.back.dto.VehicleDto;
import com.example.back.entity.*;
import com.example.back.exception.*;
import com.example.back.repository.VehicleRepository;
import lombok.AllArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class VehicleService {

    private static final Logger LOGGER = LogManager.getLogger(VehicleService.class);

    private static final String CREATE = "Create: ";
    private static final String FIND_BY_ID = "Find by ID: ";
    private static final String UPDATE = "Update: ";
    private static final String DELETE = "Delete: ";
    private static final String LIST_ALL = "List all: ";
    private static final String FIND_ALL_BY_ID = "Find All by ID: ";
    private static final String VEHICLE_RANDOM_LIST = "Vehicle random list: ";
    private static final String FILTER_BY_CATEGORY = "Filter by Category - ";
    private static final String FILTER_BY_CITY_NAME = "Filter by City Name - ";
    private static final String VEHICLE_PAGINATED_LIST = "Vehicle paginated list: ";
    private static final String FAILED_BECAUSE = "Failed because: ";
    private static final String MISSING_VALUES = "There are missing values ";
    private static final String VEHICLE_DOES_NOT_EXIST_BY_ID = "Vehicle with ID %s does not exist ";
    private static final String VEHICLE_DOES_NOT_EXIST_BY_PLATE = "Vehicle with plate %s does not exist ";
    private static final String VEHICLE_ALREADY_EXIST_BY_PLATE = "Vehicle with plate %s already exists ";
    private static final String STARTING_PROCESS = "Starting Process ";
    private static final String PROCESS_FINISHED_SUCCESSFULLY = "Process finished successfully";
    private static final String VEHICLE_DELETED = "Vehicle deleted";
    private static final String VEHICLES_SHOULD_HAVE = "Vehicles should have - ";
    private static final String CHARACTERISTICS = "At least one Characteristic; ";
    private static final String IMAGES = "Exactly 5 images; ";
    private static final String USAGE_POLICIES = "Vehicles should have - At least one Usage Policy of each type: \n";
    private static final String NORMAS_DE_LA_CASA = "\nNORMAS_DE_LA_CASA: ";
    private static final String SALUD_Y_SEGURIDAD = "\nSALUD_Y_SEGURIDAD: ";
    private static final String POLITICA_DE_CANCELACION = "\nPOLITICA_DE_CANCELACION: ";
    private static final String WRONG_PLATE_LENGTH = "The plate should have between 6 and 11 alphanumeric characters.";

    @Autowired
    private VehicleRepository vehicleRepository;
    @Autowired
    private CharacteristicService characteristicService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private VehicleTypeService vehicleTypeService;
    @Autowired
    private CityService cityService;

    private final UsagePolicyService usagePolicyService;

    public Vehicle addVehicle(VehicleDto vehicleDto) throws MissingValuesException, NotInDataBaseException, WronglyPopulatedListsException, AlreadyExistsInDataBaseException, InvalidValuesException {

        LOGGER.info(STARTING_PROCESS + CREATE);

        validatePlate(vehicleDto);

        Vehicle vehicleEntity = dtoToEntity(vehicleDto);

        checkIfMissingValues(vehicleEntity, CREATE);

        LOGGER.info(CREATE + PROCESS_FINISHED_SUCCESSFULLY);
        return vehicleRepository.save(vehicleEntity);
    }

    public Vehicle findVehicleById(Long idVehicle) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + FIND_BY_ID);

        existsById(idVehicle, FIND_BY_ID);

        return vehicleRepository.findById(idVehicle).
                orElseThrow(() -> new NotInDataBaseException(String.format(VEHICLE_DOES_NOT_EXIST_BY_ID, idVehicle)));

    }

    public Vehicle updateVehicleById(VehicleDto updatedVehicle, Long idVehicleToUpdate) throws NotInDataBaseException, MissingValuesException, WronglyPopulatedListsException {

        LOGGER.info(STARTING_PROCESS + UPDATE);

        existsById(idVehicleToUpdate, UPDATE);

        Vehicle vehicleUpdated = copyAllNotNullValues(dtoToEntity(updatedVehicle), findVehicleById(idVehicleToUpdate));
        vehicleUpdated.setIdVehicle(idVehicleToUpdate);

        LOGGER.info(UPDATE + PROCESS_FINISHED_SUCCESSFULLY);
        return vehicleRepository.save(vehicleUpdated);
    }

    public void deleteVehicle(Long id) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + DELETE);

        existsById(id, DELETE);

        LOGGER.info(VEHICLE_DELETED);
        vehicleRepository.deleteById(id);
    }
    public List<Vehicle> listAllVehicles() {

        LOGGER.info(STARTING_PROCESS + LIST_ALL);

        return vehicleRepository.findAll();
    }

    public List<Vehicle> findAllById(List<Long> idVehiclesList) throws NotInDataBaseException{

        LOGGER.info(STARTING_PROCESS + FIND_ALL_BY_ID);
        try {
            idVehiclesList.forEach(idVehicle -> {
                try {
                    existsById(idVehicle, FIND_ALL_BY_ID);
                } catch (NotInDataBaseException e) {
                    throw new RuntimeException(e);
                }

            });
        } catch (RuntimeException notInDataBaseException) {
            LOGGER.error(FIND_ALL_BY_ID + FAILED_BECAUSE + VEHICLE_DOES_NOT_EXIST_BY_ID);
            throw new NotInDataBaseException(FIND_ALL_BY_ID + FAILED_BECAUSE + VEHICLE_DOES_NOT_EXIST_BY_ID);
        }

        return vehicleRepository.findAllById(idVehiclesList);

    }

    public List<List<Vehicle>> generatePaginationArray(List<Vehicle> allVehicles) {

        LOGGER.info(STARTING_PROCESS + VEHICLE_PAGINATED_LIST);

        List<List<Vehicle>> vehicleArrays = new ArrayList<>();
        List<Vehicle> currentVehicleArray = new ArrayList<>();

        for (int i = 0; i < allVehicles.size(); i++) {
            Vehicle vehicle = allVehicles.get(i);
            currentVehicleArray.add(vehicle);

            if (currentVehicleArray.size() == 10 || i == allVehicles.size()-1) {
                vehicleArrays.add(currentVehicleArray);
                currentVehicleArray = new ArrayList<>();
            }
        }

        return vehicleArrays;
    }

    public List<List<Vehicle>> vehicleRandomList() throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + VEHICLE_RANDOM_LIST);

        List<Vehicle> getAllVehicles = vehicleRepository.getRandomList();

        return generatePaginationArray(getAllVehicles);
    }
    
    public List<List<Vehicle>> filterVehiclesByCategory(String vehicleTypeIdString) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + FILTER_BY_CATEGORY);

        Long vehicleTypeIdLong = Long.parseLong(vehicleTypeIdString);

        vehicleTypeService.existsById(vehicleTypeIdLong, FILTER_BY_CATEGORY);

        List<Vehicle> allVehicles = vehicleRepository.findAll();

        List<List<Vehicle>> vehicleArrays = new ArrayList<>();
        List<Vehicle> currentVehicleArray = new ArrayList<>();

        for (Vehicle vehicle : allVehicles) {
            if (vehicle.getVehicleType().getIdVehicleType().equals(vehicleTypeIdLong)) {
                if (currentVehicleArray.size() < 10) {
                    currentVehicleArray.add(vehicle);
                } else if (currentVehicleArray.size() == 10) {
                    vehicleArrays.add(currentVehicleArray);
                    currentVehicleArray = new ArrayList<>();
                    currentVehicleArray.add(vehicle);
                }
            }
        }

        if(currentVehicleArray.size() > 0) {
            vehicleArrays.add(currentVehicleArray);
        }

        return vehicleArrays;
    }

    public List<List<Vehicle>> filterByCityName(String name) throws NotInDataBaseException {

        LOGGER.info(STARTING_PROCESS + FILTER_BY_CITY_NAME);

        List<Vehicle> allVehicles = vehicleRepository.findbycity(name);

        return generatePaginationArray(allVehicles);
    }

    public List<List<Vehicle>> filterByDate(String start, String end) {
        List<Vehicle> allVehicles = vehicleRepository.findByDates(start, end);

        return generatePaginationArray(allVehicles);
    }

    public List<List<Vehicle>> filterByCityDate(String city, String start, String end) {
        List<Vehicle> allVehicles = vehicleRepository.findByCityDate(city, start, end);

        return generatePaginationArray(allVehicles);
    }

    public Vehicle findByPlate(String plate) throws NotInDataBaseException {

        Vehicle vehicle = null;

        try {
            vehicle = vehicleRepository.findByPlate(plate);
        } catch (Exception e) {
            throw new NotInDataBaseException(String.format(VEHICLE_DOES_NOT_EXIST_BY_PLATE, plate));
        }

        return vehicle;

    }

    public Vehicle dtoToEntity(VehicleDto vehicleDto) throws NotInDataBaseException, MissingValuesException, WronglyPopulatedListsException {

        Vehicle vehicleEntity = new Vehicle();

        vehicleEntity.setIdVehicle(vehicleDto.getIdVehicle());
        vehicleEntity.setVehicleType(vehicleTypeService.findVehicleTypeById(vehicleDto.getVehicleType().getIdVehicleType()));
        vehicleEntity.setCharacteristicsList(vehicleDto.getCharacteristicsList());
        vehicleEntity.setPricePerDay(vehicleDto.getPricePerDay());
        vehicleEntity.setDetails(vehicleDto.getDetails());
        vehicleEntity.setImagesList(vehicleDto.getImagesList());
        vehicleEntity.setModel(vehicleDto.getModel());
        vehicleEntity.setCity(cityService.findCityById(vehicleDto.getCity().getIdCity()));
        vehicleEntity.setUsagePoliciesList(vehicleDto.getUsagePoliciesList());
        vehicleEntity.setVehiclePlate(vehicleDto.getVehiclePlate().toUpperCase());

        if (vehicleEntity.getCharacteristicsList() != null && !vehicleEntity.getCharacteristicsList().isEmpty())
            vehicleEntity = populateCharacteristicList(vehicleEntity);
        if (vehicleEntity.getImagesList() != null && !vehicleEntity.getImagesList().isEmpty())
            vehicleEntity = populateImageList(vehicleEntity);
        if (vehicleEntity.getUsagePoliciesList() != null && !vehicleEntity.getUsagePoliciesList().isEmpty())
            vehicleEntity = populateUserPoliciesList(vehicleEntity);

        return vehicleEntity;
    }

    public VehicleDto entityToDto(Vehicle vehicleEntity) throws NotInDataBaseException, MissingValuesException, WronglyPopulatedListsException {

        VehicleDto vehicleDto = new VehicleDto();

        vehicleEntity = populateCharacteristicList(vehicleEntity);
        vehicleEntity = populateImageList(vehicleEntity);
        vehicleEntity = populateUserPoliciesList(vehicleEntity);

        vehicleDto.setIdVehicle(vehicleEntity.getIdVehicle());
        vehicleDto.setVehicleType(vehicleTypeService.findVehicleTypeById(vehicleEntity.getVehicleType().getIdVehicleType()));
        vehicleDto.setCharacteristicsList(vehicleEntity.getCharacteristicsList());
        vehicleDto.setPricePerDay(vehicleEntity.getPricePerDay());
        vehicleDto.setDetails(vehicleEntity.getDetails());
        vehicleDto.setImagesList(vehicleEntity.getImagesList());
        vehicleDto.setModel(vehicleEntity.getModel());
        vehicleDto.setCity(cityService.findCityById(vehicleEntity.getCity().getIdCity()));
        vehicleDto.setUsagePoliciesList(vehicleEntity.getUsagePoliciesList());
        vehicleDto.setVehiclePlate(vehicleEntity.getVehiclePlate().toUpperCase());

        return vehicleDto;
    }

    public Vehicle populateImageList(Vehicle vehicle) throws NotInDataBaseException, MissingValuesException, WronglyPopulatedListsException {

        checkListsLength(vehicle);

        if (vehicle.getCharacteristicsList() != null && !vehicle.getCharacteristicsList().isEmpty()) {
            vehicle.setImagesList
                    (imageService.findAllById(
                            vehicle.getImagesList().stream()
                                    .map(Image::getIdImage)
                                    .collect(Collectors.toList())
                    ));
            return vehicle;
        } else {
            throw new MissingValuesException(FAILED_BECAUSE + MISSING_VALUES);
        }
    }

    public Vehicle populateCharacteristicList(Vehicle vehicle) throws NotInDataBaseException, MissingValuesException, WronglyPopulatedListsException {

        checkListsLength(vehicle);

        if (vehicle.getImagesList() != null && !vehicle.getImagesList().isEmpty()) {
            vehicle.setCharacteristicsList
                    (characteristicService.findAllById(
                            vehicle.getCharacteristicsList().stream()
                                    .map(Characteristic::getIdCharacteristic)
                                    .collect(Collectors.toList())
                    ));
            return vehicle;
        } else {
            throw new MissingValuesException(FAILED_BECAUSE + MISSING_VALUES);
        }

    }

    public Vehicle populateUserPoliciesList(Vehicle vehicle) throws WronglyPopulatedListsException, NotInDataBaseException, MissingValuesException {

        if (vehicle.getUsagePoliciesList() != null && !vehicle.getUsagePoliciesList().isEmpty()) {
            vehicle.setUsagePoliciesList
                    (usagePolicyService.findAllById(
                            vehicle.getUsagePoliciesList().stream()
                                    .map(UsagePolicy::getIdUsagePolicy)
                                    .collect(Collectors.toList())
                    ));
            checkIfMissingUsagePoliciesTypes(vehicle);
            return vehicle;
        } else {
            throw new MissingValuesException(FAILED_BECAUSE + MISSING_VALUES);
        }

    }

    public void checkListsLength(Vehicle vehicle) throws WronglyPopulatedListsException {

        List<String> attributesWithWrongLength = new ArrayList<>();

        if (vehicle.getCharacteristicsList().size() <= 1) {
            attributesWithWrongLength.add(CHARACTERISTICS);
        }
        if (vehicle.getImagesList().size() != 5){
            attributesWithWrongLength.add(IMAGES);
        }

        if (!attributesWithWrongLength.isEmpty()) {
            throw new WronglyPopulatedListsException(VEHICLES_SHOULD_HAVE + attributesWithWrongLength);
        }
    }

    public void checkIfMissingUsagePoliciesTypes(Vehicle vehicle) throws WronglyPopulatedListsException {

        boolean hasPoliticaDeCancelacion = false;
        boolean hasSaludYSeguridad = false;
        boolean hasNormasDeLaCasa = false;

        for (UsagePolicy usagePolicy :
                vehicle.getUsagePoliciesList()) {
            if (usagePolicy.getUsagePolicyType() == UsagePolicyType.POLITICA_DE_CANCELACION)
                hasPoliticaDeCancelacion = true;
            if (usagePolicy.getUsagePolicyType() == UsagePolicyType.SALUD_Y_SEGURIDAD)
                hasSaludYSeguridad = true;
            if (usagePolicy.getUsagePolicyType() == UsagePolicyType.NORMAS_DE_LA_CASA)
                hasNormasDeLaCasa = true;
        }

        if (!(hasNormasDeLaCasa && hasPoliticaDeCancelacion && hasSaludYSeguridad)) {
            throw new WronglyPopulatedListsException(USAGE_POLICIES +
                    POLITICA_DE_CANCELACION + hasPoliticaDeCancelacion +
                    SALUD_Y_SEGURIDAD + hasSaludYSeguridad +
                    NORMAS_DE_LA_CASA + hasNormasDeLaCasa);
        }

    }

    public void checkIfMissingValues(Vehicle vehicle, String process) throws MissingValuesException {

        if ((vehicle.getCharacteristicsList() == null || vehicle.getCharacteristicsList().isEmpty())
                || (vehicle.getVehicleType() == null)
                || (vehicle.getPricePerDay() == null || vehicle.getPricePerDay().isNaN())
                || (vehicle.getDetails() == null || vehicle.getDetails().isBlank())
                || (vehicle.getImagesList() == null || vehicle.getImagesList().isEmpty())
                || (vehicle.getModel() == null || vehicle.getModel().isBlank())
                || (vehicle.getCity() == null)
                || (vehicle.getVehiclePlate() == null || vehicle.getVehiclePlate().isBlank())) {
            throw new MissingValuesException(process + FAILED_BECAUSE + MISSING_VALUES);
        }
    }

    public void existsById(Long vehicleId, String desiredAction) throws NotInDataBaseException {

        if (!vehicleRepository.existsById(vehicleId)) {
            LOGGER.error(String.format(desiredAction + FAILED_BECAUSE + VEHICLE_DOES_NOT_EXIST_BY_ID, vehicleId));
            throw new NotInDataBaseException(String.format(desiredAction + FAILED_BECAUSE + VEHICLE_DOES_NOT_EXIST_BY_ID, vehicleId));
        }
    }

    public void validatePlate(VehicleDto vehicleDto) throws NotInDataBaseException, AlreadyExistsInDataBaseException, InvalidValuesException {

        if (!Pattern.matches("^(?=.*[a-zA-Z0-9])[a-zA-Z0-9]{6,11}$", vehicleDto.getVehiclePlate())) {
            throw new InvalidValuesException(WRONG_PLATE_LENGTH);
        }

        if (findByPlate(vehicleDto.getVehiclePlate()) != null) {
            throw new AlreadyExistsInDataBaseException(String.format(VEHICLE_ALREADY_EXIST_BY_PLATE, vehicleDto.getVehiclePlate()));
        }
    }

    private Vehicle copyAllNotNullValues(Vehicle vehicleWithUpdates, Vehicle vehicleToUpdate) {

        if(vehicleWithUpdates.getCharacteristicsList() != null && !vehicleWithUpdates.getCharacteristicsList().isEmpty())
            vehicleToUpdate.setCharacteristicsList(vehicleWithUpdates.getCharacteristicsList());
        if(vehicleWithUpdates.getVehicleType() != null)
            vehicleToUpdate.setVehicleType(vehicleWithUpdates.getVehicleType());
        if(vehicleWithUpdates.getPricePerDay() != null && !vehicleWithUpdates.getPricePerDay().isNaN())
            vehicleToUpdate.setPricePerDay(vehicleWithUpdates.getPricePerDay());
        if(vehicleWithUpdates.getDetails() != null && !vehicleWithUpdates.getDetails().isBlank())
            vehicleToUpdate.setDetails(vehicleWithUpdates.getDetails());
        if(vehicleWithUpdates.getImagesList() != null && !vehicleWithUpdates.getImagesList().isEmpty())
            vehicleToUpdate.setImagesList(vehicleWithUpdates.getImagesList());
        if(vehicleWithUpdates.getModel() != null && !vehicleWithUpdates.getModel().isBlank())
            vehicleToUpdate.setModel(vehicleWithUpdates.getModel());
        if(vehicleWithUpdates.getVehiclePlate() != null && !vehicleWithUpdates.getVehiclePlate().isBlank())
            vehicleToUpdate.setVehiclePlate(vehicleWithUpdates.getVehiclePlate());

        return vehicleToUpdate;

    }

}
