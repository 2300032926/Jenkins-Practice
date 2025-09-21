import { FaPlusCircle } from "react-icons/fa";

function EventForm({
  onEventAdded,
  formData,
  setFormData,
  isEditing,
  onCancelEdit,
  isSubmitting,
}) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, error: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.eventName || !formData.department || !formData.organizer) {
      setFormData({ ...formData, error: "Please fill in all required fields." });
      return;
    }
    onEventAdded(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{isEditing ? "✏️ Edit Event" : "➕ Add New Event"}</h2>
      {formData.error && <div className="error-message">{formData.error}</div>}
      <div className="form-grid">
        {isEditing && (
          <input name="id" value={formData.id} readOnly placeholder="Event ID" />
        )}
        <input
          name="eventName"
          value={formData.eventName}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          name="organizer"
          value={formData.organizer}
          onChange={handleChange}
          placeholder="Organizer"
          required
        />
        <input
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Event Type"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <input
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Venue"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn add-btn" disabled={isSubmitting}>
          <FaPlusCircle /> {isEditing ? "Update Event" : "Add Event"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn cancel-btn"
            onClick={onCancelEdit}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default EventForm;
