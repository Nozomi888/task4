package com.nozomibackend.TodoBackendApp.controller;

import com.nozomibackend.TodoBackendApp.model.Task;
import com.nozomibackend.TodoBackendApp.repository.TaskRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value= "/todo")

public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public List<Task> findAll(){
        return taskRepository.findAll();
    }
    @PostMapping
    public Task save( @NonNull @RequestBody Task task){
        return taskRepository.save(task);
    }
    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @NonNull @RequestBody Task task) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        existingTask.setTitle(task.getTitle());
        existingTask.setCompleted(task.isCompleted());
        return taskRepository.save(existingTask);
    }
    @DeleteMapping(value ="/{id}")
    public void delete( @PathVariable Long id){
        taskRepository.deleteById(id);
    }
}
