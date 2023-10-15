package work.fertig.backend.project.exceptions;

public class ProjectNotFoundException extends RuntimeException {
    public ProjectNotFoundException(String field) {
        super(field);
    }

}
