import { useState, useEffect } from "react";
import api from "./api";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    department: "",
    organizer: "",
    type: "",
    date: "",
    venue: "",
    description: "",
  });

  // Load events from backend on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const saveEvent = async () => {
    try {
      if (!form.name) return;

      if (events.some(ev => ev.id === form.id)) {
        // Update existing
        await api.put(`/${form.id}`, form);
      } else {
        // Add new
        await api.post("/", form);
      }

      setForm({
        id: "",
        name: "",
        department: "",
        organizer: "",
        type: "",
        date: "",
        venue: "",
        description: "",
      });

      fetchEvents(); // reload from backend
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div>
      {/* Your form and table here */}
    </div>
  );
}
