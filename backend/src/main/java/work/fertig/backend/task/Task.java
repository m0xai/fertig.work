package work.fertig.backend.task;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.bind.annotation.CrossOrigin;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.user.FWUser;

import java.sql.Timestamp;

@Entity
@Data
@Builder
@AllArgsConstructor
@Table(name = "task")
@CrossOrigin(origins = "http://localhost:4200")
public class Task extends BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "is_done")
    private Boolean isDone;
    @Column(name = "is_draft")
    private Boolean isDraft;

    @CreationTimestamp
    @Column(name = "created_at")
    private Timestamp createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private FWUser createdBy;
}
