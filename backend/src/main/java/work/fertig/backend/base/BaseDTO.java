package work.fertig.backend.base;

import java.io.Serializable;
import java.sql.Timestamp;

public interface BaseDTO extends Serializable {
    Long getId();

    Timestamp getCreatedAt();

    Timestamp getUpdatedAt();
}
