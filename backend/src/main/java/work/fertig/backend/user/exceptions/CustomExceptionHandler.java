package work.fertig.backend.user.exceptions;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<Object> handleUserAlreadyExistsException(UserAlreadyExistsException ex) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("timestamp", LocalDateTime.now());
        String message = "A user with the email adress" + ex.getUserEmail() + " already exits.";
        ErrorMessage errorMessage = ErrorMessage.createErrorMessage(message);
        body.put("message", errorMessage);
        return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
    }

}

class ErrorMessage {
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ErrorMessage(String message) {
        this.message = message;
    }

    public static ErrorMessage createErrorMessage(String message) {
        return new ErrorMessage(message);
    }
}
