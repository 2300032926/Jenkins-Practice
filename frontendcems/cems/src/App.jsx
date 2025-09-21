// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import api from "./services/api";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    id: "",
    eventName: "",
    department: "",
    organizer: "",
    type: "",
    date: "",
    venue: "",
    description: "",
    error: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to load events.");
      });
  }, []);

  const resetForm = () => {
    setForm({
      id: "",
      eventName: "",
      department: "",
      organizer: "",
      type: "",
      date: "",
      venue: "",
      description: "",
      error: null,
    });
    setIsEditing(false);
  };

  const handleEventAdded = (event) => {
    setIsSubmitting(true);
    setError(null);

    api
      api.post("", {
  eventName: event.eventName,
  department: event.department,
  organizer: event.organizer,
  type: event.type,
  date: event.date,
  venue: event.venue,
  description: event.description,
})
      .then((response) => {
        setEvents((prevEvents) => [...prevEvents, response.data]);
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        setError(
          error.response?.data?.message ||
            "Failed to add event. Please try again."
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleUpdate = () => {
    if (!form.eventName || !form.department || !form.organizer) {
      setForm({ ...form, error: "Please fill in all required fields." });
      return;
    }

    setIsSubmitting(true);
    api
      .put(`/${form.id}`, form)
      .then((response) => {
        const updatedEvents = events.map((ev) =>
          ev.id === form.id ? response.data : ev
        );
        setEvents(updatedEvents);
        resetForm();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
        setError("Failed to update event.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const deleteEvent = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setError(null);
    api
      .delete(`/${id}`)
      .then(() => {
        setEvents(events.filter((ev) => ev.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
        setError("Failed to delete event.");
      });
  };

  const handleEdit = (event) => {
    setForm({ ...event, error: null });
    setIsEditing(true);
    setError(null);
  };

  return (
    <div className="app-container">
      <div className="header">🎓 College Event Management</div>
      {error && <div className="error-message">{error}</div>}
      <EventForm
        onEventAdded={isEditing ? handleUpdate : handleEventAdded}
        formData={form}
        setFormData={setForm}
        isEditing={isEditing}
        onCancelEdit={resetForm}
        isSubmitting={isSubmitting}
      />
      <EventList events={events} onDelete={deleteEvent} onEdit={handleEdit} />
    </div>
  );
}

export default App;
