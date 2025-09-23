import { useState, useEffect } from "react";
import api from "./api"; // Make sure api.js points to your backend
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    id: null,
    name: "",
    department: "",
    organizer: "",
    type: "",
    date: "",
    venue: "",
    description: "",
  });

  // Load events from backend on mount
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveEvent = async () => {
    if (!form.name) return;

    try {
      if (!form.id) {
        form.id = uuidv4(); // generate unique string ID for new events
        await api.post("/", form);
      } else {
        await api.put(`/${form.id}`, form);
      }

      // Reset form
      setForm({
        id: null,
        name: "",
        department: "",
        organizer: "",
        type: "",
        date: "",
        venue: "",
        description: "",
      });

      fetchEvents(); // refresh list
    } catch (err) {
      console.error("Error saving event:", err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await api.delete(`/${id}`);
      setEvents(events.filter((ev) => ev.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  const editEvent = (event) => {
    setForm(event); // load event into form for editing
  };

  return (
    <div className="app-container">
      <header className="header">🎓 College Event Management</header>

      {/* Form */}
      <div className="form-card">
        <h2>{form.id ? "Edit Event" : "Add New Event"}</h2>
        <div className="form-grid">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Event Name"
          />
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Department"
          />
          <input
            name="organizer"
            value={form.organizer}
            onChange={handleChange}
            placeholder="Organizer"
          />
          <input
            name="type"
            value={form.type}
            onChange={handleChange}
            placeholder="Type"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            placeholder="Venue"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>
        <button className="btn save-btn" onClick={saveEvent}>
          {form.id ? "✏️ Update Event" : "💾 Save Event"}
        </button>
      </div>

      {/* Event Table */}
      <div className="table-card">
        <h2>Event List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Organizer</th>
              <th>Type</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="9">No events yet</td>
              </tr>
            ) : (
              events.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.id}</td>
                  <td>{ev.name}</td>
                  <td>{ev.department}</td>
                  <td>{ev.organizer}</td>
                  <td>{ev.type}</td>
                  <td>{ev.date}</td>
                  <td>{ev.venue}</td>
                  <td>{ev.description}</td>
                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() => editEvent(ev)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => deleteEvent(ev.id)}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
