package com.flowytasks.task;

import com.flowytasks.user.AppUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repo;

    public TaskService(TaskRepository repo) {
        this.repo = repo;
    }

    public List<Task> all(AppUser user) {
        return repo.findAllByUserIdOrderByCreatedAtDesc(user.getId());
    }

    public Task one(Long id, AppUser user) {
        return repo.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public Task create(Task task, AppUser user) {
        task.setCompleted(false);
        task.setUser(user);

        if (task.getPriority() == null) {
            task.setPriority(Priority.MEDIUM);
        }

        return repo.save(task);
    }

    public Task update(Long id, Task changes, AppUser user) {
        Task task = one(id, user);

        task.setTitle(changes.getTitle());
        task.setDescription(changes.getDescription());
        task.setPriority(
                changes.getPriority() == null ? Priority.MEDIUM : changes.getPriority()
        );
        task.setDueDate(changes.getDueDate());
        task.setCompleted(changes.isCompleted());

        return repo.save(task);
    }

    public Task toggle(Long id, AppUser user) {
        Task task = one(id, user);
        task.setCompleted(!task.isCompleted());
        return repo.save(task);
    }

    public void delete(Long id, AppUser user) {
        repo.delete(one(id, user));
    }
}
