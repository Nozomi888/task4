package com.nozomibackend.TodoBackendApp.repository;

import com.nozomibackend.TodoBackendApp.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {


}
