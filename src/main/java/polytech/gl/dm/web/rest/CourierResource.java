package polytech.gl.dm.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import polytech.gl.dm.domain.Courier;
import polytech.gl.dm.repository.CourierRepository;
import polytech.gl.dm.web.rest.errors.BadRequestAlertException;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link polytech.gl.dm.domain.Courier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CourierResource {

    private final Logger log = LoggerFactory.getLogger(CourierResource.class);

    private static final String ENTITY_NAME = "courier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourierRepository courierRepository;

    public CourierResource(CourierRepository courierRepository) {
        this.courierRepository = courierRepository;
    }

    /**
     * {@code POST  /couriers} : Create a new courier.
     *
     * @param courier the courier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courier, or with status {@code 400 (Bad Request)} if the courier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/couriers")
    public ResponseEntity<Courier> createCourier(@Valid @RequestBody Courier courier) throws URISyntaxException {
        log.debug("REST request to save Courier : {}", courier);
        if (courier.getId() != null) {
            throw new BadRequestAlertException("A new courier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Courier result = courierRepository.save(courier);
        return ResponseEntity
            .created(new URI("/api/couriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /couriers/:id} : Updates an existing courier.
     *
     * @param id the id of the courier to save.
     * @param courier the courier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courier,
     * or with status {@code 400 (Bad Request)} if the courier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/couriers/{id}")
    public ResponseEntity<Courier> updateCourier(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Courier courier
    ) throws URISyntaxException {
        log.debug("REST request to update Courier : {}, {}", id, courier);
        if (courier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Courier result = courierRepository.save(courier);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courier.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /couriers/:id} : Partial updates given fields of an existing courier, field will ignore if it is null
     *
     * @param id the id of the courier to save.
     * @param courier the courier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courier,
     * or with status {@code 400 (Bad Request)} if the courier is not valid,
     * or with status {@code 404 (Not Found)} if the courier is not found,
     * or with status {@code 500 (Internal Server Error)} if the courier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/couriers/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Courier> partialUpdateCourier(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Courier courier
    ) throws URISyntaxException {
        log.debug("REST request to partial update Courier partially : {}, {}", id, courier);
        if (courier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courier.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courierRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Courier> result = courierRepository
            .findById(courier.getId())
            .map(existingCourier -> {
                if (courier.getFirstName() != null) {
                    existingCourier.setFirstName(courier.getFirstName());
                }
                if (courier.getLastName() != null) {
                    existingCourier.setLastName(courier.getLastName());
                }
                if (courier.getPhone() != null) {
                    existingCourier.setPhone(courier.getPhone());
                }
                if (courier.getVehicle() != null) {
                    existingCourier.setVehicle(courier.getVehicle());
                }

                return existingCourier;
            })
            .map(courierRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courier.getId().toString())
        );
    }

    /**
     * {@code GET  /couriers} : get all the couriers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of couriers in body.
     */
    @GetMapping("/couriers")
    public List<Courier> getAllCouriers() {
        log.debug("REST request to get all Couriers");
        return courierRepository.findAll();
    }

    /**
     * {@code GET  /couriers/:id} : get the "id" courier.
     *
     * @param id the id of the courier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/couriers/{id}")
    public ResponseEntity<Courier> getCourier(@PathVariable Long id) {
        log.debug("REST request to get Courier : {}", id);
        Optional<Courier> courier = courierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(courier);
    }

    /**
     * {@code DELETE  /couriers/:id} : delete the "id" courier.
     *
     * @param id the id of the courier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/couriers/{id}")
    public ResponseEntity<Void> deleteCourier(@PathVariable Long id) {
        log.debug("REST request to delete Courier : {}", id);
        courierRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
