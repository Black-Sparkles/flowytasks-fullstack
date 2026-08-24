package com.flowytasks.task;

import com.flowytasks.user.AppUser;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @GetMapping
    public List<Task> all(@AuthenticationPrincipal AppUser user) {
        return service.all(user);
    }

    @GetMapping("/{id}")
    public Task one(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUser user
    ) {
        return service.one(id, user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task create(
            @Valid @RequestBody Task task,
            @AuthenticationPrincipal AppUser user
    ) {
        return service.create(task, user);
    }

    @PutMapping("/{id}")
    public Task update(
            @PathVariable Long id,
            @Valid @RequestBody Task task,
            @AuthenticationPrincipal AppUser user
    ) {
        return service.update(id, task, user);
    }

    @PatchMapping("/{id}/toggle")
    public Task toggle(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUser user
    ) {
        return service.toggle(id, user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUser user
    ) {
        service.delete(id, user);
    }
}
