package work.fertig.backend.base;

import java.sql.Timestamp;

public interface BaseDTO {
    Long getId();

    Timestamp getCreatedAt();

    Timestamp getUpdatedAt();
}
