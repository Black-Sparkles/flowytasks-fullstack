package com.flowytasks.task;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TaskService {
 private final TaskRepository repo; public TaskService(TaskRepository repo){this.repo=repo;}
 public List<Task> all(){return repo.findAllByOrderByCreatedAtDesc();}
 public Task one(Long id){return repo.findById(id).orElseThrow(()->new TaskNotFoundException(id));}
 public Task create(Task t){t.setCompleted(false); if(t.getPriority()==null)t.setPriority(Priority.MEDIUM); return repo.save(t);}
 public Task update(Long id,Task c){Task t=one(id); t.setTitle(c.getTitle());t.setDescription(c.getDescription());t.setPriority(c.getPriority()==null?Priority.MEDIUM:c.getPriority());t.setDueDate(c.getDueDate());t.setCompleted(c.isCompleted());return repo.save(t);}
 public Task toggle(Long id){Task t=one(id);t.setCompleted(!t.isCompleted());return repo.save(t);}
 public void delete(Long id){repo.delete(one(id));}
}
