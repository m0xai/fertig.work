package work.fertig.backend.tasklist.dtos;

import lombok.Builder;
import lombok.Data;
import work.fertig.backend.task.Task;
import work.fertig.backend.task.dtos.TaskDTOResponse;
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
    private List<TaskDTOResponse> tasks;

    public static TaskListDTOResponse fromTaskList(TaskList taskList) {
        return TaskListDTOResponse.builder()
                .id(taskList.getId())
                .title(taskList.getTitle())
                .createdAt(taskList.getCreatedAt())
                .updatedAt(taskList.getUpdatedAt())
                .tasks(setTaskDTOResponseList(taskList.getTasks()))
                .build();
    }

    private static List<TaskDTOResponse> setTaskDTOResponseList(List<Task> taskList) {
        List<TaskDTOResponse> tasks = new ArrayList<>();
        if (taskList != null) { // e.g. creation of a new task list
            for (Task task : taskList) {
                tasks.add(TaskDTOResponse.fromTask(task));
            }
        }
        return tasks;
    }
}
