package work.fertig.backend.task;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import work.fertig.backend.tasklist.TaskList;
import work.fertig.backend.tasklist.TaskListRepository;
import work.fertig.backend.user.FWUser;
import work.fertig.backend.user.FWUserRepository;

import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
class TaskControllerTest {
    private Long taskId;
    private Long userId;
    private Long taskListId;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private FWUserRepository fwUserRepository;

    @Autowired
    private TaskListRepository taskListRepository;

    @BeforeEach
    void setUp() {
        this.userId = fwUserRepository.findAll().get(0).getId();
        this.taskListId = this.taskListRepository.findAll().get(0).getId();
        taskRepository.save(Task.builder().name("Task 1").description("Test task's description text").createdBy(FWUser.builder().id(this.userId).build()).taskList(TaskList.builder().id(this.taskListId).build()).build());
        List<Task> tasks = taskRepository.findAll();
        this.taskId = tasks.get(0).getId();
    }

    @Test
    @WithMockUser(username = "kerem", password = "1299")
    void getSingleTask() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/tasks/{id}/", taskId))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Task 1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.createdBy.id").value(this.userId))
                .andExpect(MockMvcResultMatchers.jsonPath("$.taskList").value(this.taskListId));
    }
}