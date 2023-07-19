package work.fertig.backend.tasklist;

import jakarta.persistence.*;
import lombok.*;
import work.fertig.backend.base.BaseEntity;
import work.fertig.backend.task.Task;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskList extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @OneToMany(mappedBy = "taskList", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        TaskList taskList = (TaskList) o;
        return Objects.equals(getId(), taskList.getId()) && Objects.equals(getTitle(), taskList.getTitle()) && Objects.equals(getTasks(), taskList.getTasks());
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), getId(), getTitle(), getTasks());
    }
}
