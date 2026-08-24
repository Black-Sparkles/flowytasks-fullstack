// package com.flowytasks.task;

// import com.flowytasks.user.AppUser;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;

// import java.util.List;
// import java.util.Optional;

// import static org.assertj.core.api.Assertions.assertThat;
// import static org.assertj.core.api.Assertions.assertThatThrownBy;
// import static org.mockito.Mockito.*;

// @ExtendWith(MockitoExtension.class)
// class TaskServiceTest {

//     @Mock
//     private TaskRepository repository;

//     private TaskService service;

//     private AppUser user;

//     @BeforeEach
//     void setUp() {
//         service = new TaskService(repository);
//         user = mock(AppUser.class);
//         when(user.getId()).thenReturn(42L);
//     }

//     @Test
//     void allReturnsOnlyCurrentUsersTasks() {
//         Task task = new Task();
//         task.setTitle("My private task");

//         when(repository.findAllByUserIdOrderByCreatedAtDesc(42L))
//                 .thenReturn(List.of(task));

//         List<Task> result = service.all(user);

//         assertThat(result).containsExactly(task);
//         verify(repository).findAllByUserIdOrderByCreatedAtDesc(42L);
//     }

//     @Test
//     void createAssignsTaskToCurrentUser() {
//         Task task = new Task();
//         task.setTitle("Write tests");
//         task.setPriority(null);

//         when(repository.save(task)).thenReturn(task);

//         Task result = service.create(task, user);

//         assertThat(result.getUser()).isSameAs(user);
//         assertThat(result.getPriority()).isEqualTo(Priority.MEDIUM);
//         assertThat(result.isCompleted()).isFalse();
//         verify(repository).save(task);
//     }

//     @Test
//     void userCannotAccessTaskOwnedByAnotherUser() {
//         when(repository.findByIdAndUserId(99L, 42L))
//                 .thenReturn(Optional.empty());

//         assertThatThrownBy(() -> service.one(99L, user))
//                 .isInstanceOf(TaskNotFoundException.class);

//         verify(repository).findByIdAndUserId(99L, 42L);
//     }
// }

package com.flowytasks.task;

import com.flowytasks.user.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository repository;

    @Mock
    private AppUser user;

    private TaskService service;

    @BeforeEach
    void setUp() {
        service = new TaskService(repository);
    }

    @Test
    void allReturnsOnlyCurrentUsersTasks() {
        when(user.getId()).thenReturn(42L);

        Task task = new Task();
        task.setTitle("My private task");

        when(repository.findAllByUserIdOrderByCreatedAtDesc(42L))
                .thenReturn(List.of(task));

        List<Task> result = service.all(user);

        assertThat(result).containsExactly(task);

        verify(repository)
                .findAllByUserIdOrderByCreatedAtDesc(42L);
    }

    @Test
    void createAssignsTaskToCurrentUser() {
        Task task = new Task();
        task.setTitle("Write tests");
        task.setPriority(null);

        when(repository.save(task))
                .thenReturn(task);

        Task result = service.create(task, user);

        assertThat(result.getUser())
                .isSameAs(user);

        assertThat(result.getPriority())
                .isEqualTo(Priority.MEDIUM);

        assertThat(result.isCompleted())
                .isFalse();

        verify(repository)
                .save(task);
    }

    @Test
    void userCannotAccessTaskOwnedByAnotherUser() {
        when(user.getId()).thenReturn(42L);

        when(repository.findByIdAndUserId(99L, 42L))
                .thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                service.one(99L, user)
        )
                .isInstanceOf(TaskNotFoundException.class);

        verify(repository)
                .findByIdAndUserId(99L, 42L);
    }
}