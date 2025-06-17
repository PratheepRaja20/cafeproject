package com.example.cms.service;

import com.example.cms.model.MenuItem;

import java.util.List;

public interface MenuItemService {
    List<MenuItem> getAllItems();
    MenuItem save(MenuItem item);
    MenuItem update(Long id, MenuItem newItem);
    void delete(Long id);
    Long getMenuCount();
}
