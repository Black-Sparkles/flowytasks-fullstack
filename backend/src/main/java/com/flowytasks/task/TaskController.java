package com.flowytasks.task;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/tasks")
public class TaskController {
 private final TaskService service; public TaskController(TaskService service){this.service=service;}
 @GetMapping public List<Task> all(){return service.all();}
 @GetMapping("/{id}") public Task one(@PathVariable Long id){return service.one(id);}
 @PostMapping @ResponseStatus(HttpStatus.CREATED) public Task create(@Valid @RequestBody Task t){return service.create(t);}
 @PutMapping("/{id}") public Task update(@PathVariable Long id,@Valid @RequestBody Task t){return service.update(id,t);}
 @PatchMapping("/{id}/toggle") public Task toggle(@PathVariable Long id){return service.toggle(id);}
 @DeleteMapping("/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id){service.delete(id);}
}
