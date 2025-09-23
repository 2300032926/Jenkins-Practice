package com.example.eventmanagement.service;

import com.example.eventmanagement.model.Event;
import com.example.eventmanagement.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository repository;

    public EventService(EventRepository repository) {
        this.repository = repository;
    }

    public List<Event> getAllEvents() {
        return repository.findAll();
    }

    public Event getEventById(String id) {
        return repository.findById(id).orElse(null);
    }

    public Event saveEvent(Event event) {
        return repository.save(event);
    }

    public void deleteEvent(String id) {
        repository.deleteById(id);
    }
}
