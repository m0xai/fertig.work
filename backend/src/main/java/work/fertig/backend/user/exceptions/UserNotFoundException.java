package work.fertig.backend.user.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String field) {
        super(field);
    }
}