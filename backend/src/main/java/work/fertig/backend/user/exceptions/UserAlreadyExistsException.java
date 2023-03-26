package work.fertig.backend.user.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
    private String email;

    public UserAlreadyExistsException(String email) {
        this.email = email;
    }

    public String getUserEmail() {
        return this.email;
    }
}