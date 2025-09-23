import { FaTrash, FaEdit } from "react-icons/fa";

function EventList({ events, onDelete, onEdit }) {
  return (
    <div className="table-container">
      <h2>📋 Event List</h2>
      {events.length === 0 ? (
        <p className="empty">No events added yet.</p>
      ) : (
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
            {events.map((ev) => (
              <tr key={ev.eventId}>
                <td>{ev.eventId}</td>
                <td>{ev.eventName}</td>
                <td>{ev.department}</td>
                <td>{ev.organizer}</td>
                <td>{ev.eventType}</td>
                <td>{ev.date}</td>
                <td>{ev.venue}</td>
                <td>{ev.description}</td>
                <td>
                  <button
                    className="btn edit-btn"
                    onClick={() =>
                      onEdit(ev.eventId, {
                        ...ev,
                        eventName: prompt("Edit Event Name:", ev.eventName),
                      })
                    }
                  >
                    <FaEdit /> Edit
                  </button>
                  <button className="btn delete-btn" onClick={() => onDelete(ev.eventId)}>
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EventList;