package work.fertig.backend.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import work.fertig.backend.project.dtos.ProjectUsersDTOResponse;
import work.fertig.backend.project.models.ProjectUsers;
import work.fertig.backend.project.repositories.ProjectUsersRepository;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class ProjectUsersController {

    @Autowired
    private ProjectUsersRepository projectUsersRepository;

    @GetMapping("/project_users/{projectUsersId}/")
    public ResponseEntity<ProjectUsersDTOResponse> getSingleProjectUsers(@PathVariable Long projectUsersId) {
        ProjectUsers projectUsers =
                projectUsersRepository.findById(projectUsersId).orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "A Project users entity with ID: " + projectUsersId + " not found."));
        return new ResponseEntity<>(ProjectUsersDTOResponse.fromProjectUsers(projectUsers), HttpStatus.OK);
    }
}
