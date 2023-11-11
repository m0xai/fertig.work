package work.fertig.backend.tasklist.dtos;

import lombok.Builder;
import lombok.Data;
import work.fertig.backend.task.Task;
import work.fertig.backend.tasklist.TaskList;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class TaskListDTOResponse implements TaskListDTO {
    private Long id;
    private String title;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private List<Long> tasks;
    private Long project;

    public static TaskListDTOResponse fromTaskList(TaskList taskList) {
        return TaskListDTOResponse.builder()
                .id(taskList.getId())
                .title(taskList.getTitle())
                .createdAt(taskList.getCreatedAt())
                .updatedAt(taskList.getUpdatedAt())
                .tasks(setTaskIds(taskList.getTasks()))
                .project(taskList.getProject().getId())
                .build();
    }

    private static List<Long> setTaskIds(List<Task> taskList) {
        List<Long> tasks = new ArrayList<>();
        if (taskList != null) { // e.g. creation of a new task list
            for (Task task : taskList) {
                tasks.add(task.getId());
            }
        }
        return tasks;
    }
}
