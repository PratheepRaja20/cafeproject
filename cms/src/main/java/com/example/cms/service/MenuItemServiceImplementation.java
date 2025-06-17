package com.example.cms.service;

import com.example.cms.model.MenuItem;
import com.example.cms.repository.MenuItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemServiceImplementation implements MenuItemService {

    @Autowired
    private MenuItemRepository repo;

    @Override
    public List<MenuItem> getAllItems() {
        return repo.findAll();
    }

    @Override
    public MenuItem save(MenuItem item) {
        return repo.save(item);
    }

    @Override
    public MenuItem update(Long id, MenuItem newItem) {
        Optional<MenuItem> optional = repo.findById(id);
        if (optional.isPresent()) {
            MenuItem existing = optional.get();//get db menu
            existing.setName(newItem.getName());
            existing.setCategory(newItem.getCategory());
            existing.setPrice(newItem.getPrice());
          
            return repo.save(existing);
        } else {
            throw new RuntimeException("Menu item not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
    @Override
    public Long getMenuCount() {
        return repo.count();
    }
    
}
