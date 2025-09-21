//package event.example.service;
//
//import event.example.model.Event;
//import event.example.repository.EventRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class EventService {
//
//    private final EventRepository eventRepository;
//
//    public EventService(EventRepository eventRepository) {
//        this.eventRepository = eventRepository;
//    }
//
//    public Event saveEvent(Event event) {
//        if (event == null) {
//            throw new IllegalArgumentException("Event cannot be null");
//        }
//        return eventRepository.save(event);
//    }
//
//    public List<Event> getAllEvents() {
//        return eventRepository.findAll();
//    }
//
//    public Optional<Event> getEventById(Long id) {
//        if (id == null) {
//            throw new IllegalArgumentException("Event ID cannot be null");
//        }
//        return eventRepository.findById(id);
//    }
//
//    public Event updateEvent(Long id, Event updatedEvent) {
//        if (id == null) {
//            throw new IllegalArgumentException("Event ID cannot be null");
//        }
//        if (updatedEvent == null) {
//            throw new IllegalArgumentException("Updated event cannot be null");
//        }
//
//        Event event = eventRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Event not found"));
//
//        if (updatedEvent.getEventName() != null) {
//            event.setEventName(updatedEvent.getEventName());
//        }
//        if (updatedEvent.getDepartment() != null) {
//            event.setDepartment(updatedEvent.getDepartment());
//        }
//        if (updatedEvent.getOrganizer() != null) {
//            event.setOrganizer(updatedEvent.getOrganizer());
//        }
//        if (updatedEvent.getType() != null) {
//            event.setType(updatedEvent.getType());
//        }
//        if (updatedEvent.getDate() != null) {
//            event.setDate(updatedEvent.getDate());
//        }
//        if (updatedEvent.getVenue() != null) {
//            event.setVenue(updatedEvent.getVenue());
//        }
//        if (updatedEvent.getDescription() != null) {
//            event.setDescription(updatedEvent.getDescription());
//        }
//
//        return eventRepository.save(event);
//    }
//
//    public void deleteEvent(Long id) {
//        if (id == null) {
//            throw new IllegalArgumentException("Event ID cannot be null");
//        }
//        if (!eventRepository.existsById(id)) {
//            throw new RuntimeException("Event not found");
//        }
//        eventRepository.deleteById(id);
//    }
//}
package event.example.service;

import event.example.model.Event;
import event.example.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    // Save a new event
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    // Get all events
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // Get an event by ID
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findById(id);
    }

    // Update an existing event
    public Event updateEvent(Long id, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        // Update fields as necessary
        if (updatedEvent.getEventName() != null) {
            existingEvent.setEventName(updatedEvent.getEventName());
        }
        if (updatedEvent.getDepartment() != null) {
            existingEvent.setDepartment(updatedEvent.getDepartment());
        }
        if (updatedEvent.getOrganizer() != null) {
            existingEvent.setOrganizer(updatedEvent.getOrganizer());
        }
        if (updatedEvent.getType() != null) {
            existingEvent.setType(updatedEvent.getType());
        }
        if (updatedEvent.getDate() != null) {
            existingEvent.setDate(updatedEvent.getDate());
        }
        if (updatedEvent.getVenue() != null) {
            existingEvent.setVenue(updatedEvent.getVenue());
        }
        if (updatedEvent.getDescription() != null) {
            existingEvent.setDescription(updatedEvent.getDescription());
        }

        return eventRepository.save(existingEvent);
    }

    // Delete an event by ID
    public void deleteEvent(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        eventRepository.delete(event);
    }
}
