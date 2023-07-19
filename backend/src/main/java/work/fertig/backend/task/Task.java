package work.fertig.backend.task;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.task.enums.TaskPriority;
import work.fertig.backend.task.enums.TaskStatus;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.user.FWUser;

@Entity
@Table(name = "task")
@CrossOrigin(origins = "http://localhost:4200")
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Task extends BaseEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "is_done")
    private Boolean isDone;
    @Column(name = "is_draft")
    private Boolean isDraft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private FWUser createdBy;

    @Enumerated(EnumType.ORDINAL)
    @Column(columnDefinition = "integer default 0")
    private TaskStatus status;

    @Enumerated(EnumType.ORDINAL)
    @Column(columnDefinition = "2")
    private TaskPriority priority;

    @ManyToOne
    private TaskList taskList;
}
