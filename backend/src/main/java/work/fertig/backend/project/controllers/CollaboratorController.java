package work.fertig.backend.project.controllers;

import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.dtos.CollaboratorDTORequest;
import work.fertig.backend.project.dtos.CollaboratorDTOResponse;
import work.fertig.backend.project.services.CollaboratorService;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/api/v1")
public class CollaboratorController {
    @Autowired
    private CollaboratorService collaboratorService;

    @PostMapping("/collaborators/")
    public ResponseEntity<CollaboratorDTOResponse> create(@RequestBody @Valid CollaboratorDTORequest request) {
        return new ResponseEntity<>(collaboratorService.create(request), HttpStatus.CREATED);
    }

    @PostMapping("/collaborators/bulk/")
    public ResponseEntity<List<CollaboratorDTOResponse>> createBulk(@RequestBody List<CollaboratorDTORequest> request) {
        try {
            System.out.println(request);
            return new ResponseEntity<>(collaboratorService.createBulk(request), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/collaborators/{id}/")
    public ResponseEntity<CollaboratorDTOResponse> get(@PathVariable Long id) {
        try {
            return new ResponseEntity<>(collaboratorService.get(id), HttpStatus.OK);
        } catch (RuntimeException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    @GetMapping(value = "/collaborators/", params = {"projectId"})
    public ResponseEntity<List<CollaboratorDTOResponse>> getAllByProjectId(@RequestParam Long projectId) {
        return new ResponseEntity<>(collaboratorService.getCollaboratorsByProject(projectId), HttpStatus.OK);
    }

    @Data
    class CollaboratorDTORequestList {
        private List<CollaboratorDTORequest> items = new ArrayList<>();
    }
}
