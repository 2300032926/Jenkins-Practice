package event.example.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    private String eventName;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Organizer is required")
    private String organizer;

    private String type;
    private String date;
    private String venue;
    private String description;

    // Manually added getters to ensure compatibility
    public String getEventName() {
        return eventName;
    }

    public String getDepartment() {
        return department;
    }

    public String getOrganizer() {
        return organizer;
    }

    public String getType() {
        return type;
    }

    public String getDate() {
        return date;
    }

    public String getVenue() {
        return venue;
    }

    public String getDescription() {
        return description;
    }

    // Manually added setters to ensure compatibility
    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}