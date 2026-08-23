package com.flowytasks.task;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Entity @Table(name="tasks")
public class Task {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Size(max=120) @Column(nullable=false,length=120) private String title;
 @Size(max=1000) @Column(length=1000) private String description;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Priority priority=Priority.MEDIUM;
 private LocalDate dueDate;
 @Column(nullable=false) private boolean completed=false;
 @Column(nullable=false,updatable=false) private LocalDateTime createdAt;
 @Column(nullable=false) private LocalDateTime updatedAt;
 @PrePersist void create(){ createdAt=LocalDateTime.now(); updatedAt=createdAt; }
 @PreUpdate void updateTime(){ updatedAt=LocalDateTime.now(); }
 public Long getId(){return id;} public String getTitle(){return title;} public String getDescription(){return description;} public Priority getPriority(){return priority;} public LocalDate getDueDate(){return dueDate;} public boolean isCompleted(){return completed;} public LocalDateTime getCreatedAt(){return createdAt;} public LocalDateTime getUpdatedAt(){return updatedAt;}
 public void setTitle(String v){title=v;} public void setDescription(String v){description=v;} public void setPriority(Priority v){priority=v;} public void setDueDate(LocalDate v){dueDate=v;} public void setCompleted(boolean v){completed=v;}
}
