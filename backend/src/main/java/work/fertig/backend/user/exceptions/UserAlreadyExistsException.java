package work.fertig.backend.user.exceptions;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String field) {
        super(field);
    }
}