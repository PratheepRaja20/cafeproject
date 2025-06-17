package com.example.cms.controller;

import com.example.cms.model.MenuItem;
import com.example.cms.service.MenuItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminMenuController {

    @Autowired
    private MenuItemService service;

    @GetMapping
    public List<MenuItem> getAll() {
        return service.getAllItems();
    }

    @PostMapping
    public MenuItem create(@RequestBody MenuItem item) {
        return service.save(item);
    }

    @PutMapping("/{id}")
    public MenuItem update(@PathVariable Long id, @RequestBody MenuItem item) {
        return service.update(id, item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
    
    @GetMapping("/count")
    public long getMenuCount() {
        return service.getMenuCount();
    }
}
