import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Table, Button, Badge, Alert, Spinner, Modal,
} from 'react-bootstrap';
import { PlusCircle, Pencil, Trash, Eye } from 'react-bootstrap-icons';
import type { EventData } from '../../types';
import { adminGetEvents, adminDeleteEvent } from '../../api';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function AdminEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await adminGetEvents();
      setEvents(data);
    } catch {
      setError('Failed to load events.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await adminDeleteEvent(deleteId);
      setEvents((prev) => prev.filter((e) => e.id !== deleteId));
      setDeleteId(null);
    } catch {
      setError('Failed to delete event.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Events</h4>
        <Link to="/admin/events/new" className="btn btn-primary">
          <PlusCircle className="me-2" />
          New Event
        </Link>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
      ) : (
        <div className="card border-0 shadow-sm">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Registrations</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>
                    <div className="fw-semibold">{event.title}</div>
                    <div className="small text-muted">{event.location}</div>
                  </td>
                  <td>
                    <span className="category-chip">{event.category}</span>
                  </td>
                  <td>
                    <Badge
                      className={`badge-${event.status}`}
                      style={{ fontSize: '0.75rem' }}
                    >
                      {event.status}
                    </Badge>
                  </td>
                  <td className="small">{formatDate(event.date)}</td>
                  <td>
                    <span className="small">
                      {event.registeredCount} / {event.capacity}
                    </span>
                  </td>
                  <td className="small">
                    {event.price === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      `$${event.price}`
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Link
                        to={`/events/${event.id}`}
                        className="btn btn-sm btn-outline-secondary"
                        title="View"
                      >
                        <Eye />
                      </Link>
                      <Link
                        to={`/admin/events/${event.id}/edit`}
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                      >
                        <Pencil />
                      </Link>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        title="Delete"
                        onClick={() => setDeleteId(event.id)}
                      >
                        <Trash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Delete confirmation */}
      <Modal show={!!deleteId} onHide={() => setDeleteId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this event? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? <Spinner size="sm" /> : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
