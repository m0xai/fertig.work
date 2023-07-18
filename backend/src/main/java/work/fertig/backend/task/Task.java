package work.fertig.backend.task;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.sql.Timestamp;

@Entity
@Data
@Table(name = "task")
@CrossOrigin(origins = "http://localhost:4200")
public class Task {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "A name for the task is required.")
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "is_done")
    private Boolean isDone;
    @Column(name = "is_draft")
    private Boolean isDraft;
    @Column(name = "created_at")
    @CreationTimestamp
    private Timestamp createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Timestamp updatedAt;
}
