package com.flowytasks.common;
import com.flowytasks.task.TaskNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class ApiExceptionHandler {
 @ExceptionHandler(TaskNotFoundException.class) @ResponseStatus(HttpStatus.NOT_FOUND) public Map<String,Object> notFound(TaskNotFoundException e){return body(404,e.getMessage());}
 @ExceptionHandler(MethodArgumentNotValidException.class) @ResponseStatus(HttpStatus.BAD_REQUEST) public Map<String,Object> invalid(MethodArgumentNotValidException e){String m=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+": "+x.getDefaultMessage()).orElse("Invalid request");return body(400,m);}
 private Map<String,Object> body(int status,String message){Map<String,Object>b=new LinkedHashMap<>();b.put("timestamp",LocalDateTime.now());b.put("status",status);b.put("message",message);return b;}
}
