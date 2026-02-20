import { useState, useEffect } from 'react';
import {
  Container, Table, Button, Badge, Alert, Spinner, Form, Row, Col,
} from 'react-bootstrap';
import { PersonCheckFill } from 'react-bootstrap-icons';
import type { Registration, EventData } from '../../types';
import { adminGetRegistrations, adminGetEvents, adminCheckIn } from '../../api';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [regs, evts] = await Promise.all([
        adminGetRegistrations(selectedEvent || undefined),
        adminGetEvents(),
      ]);
      setRegistrations(regs);
      setEvents(evts);
    } catch {
      setError('Failed to load registrations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [selectedEvent]);

  const handleCheckIn = async (regId: string) => {
    try {
      const updated = await adminCheckIn(regId);
      setRegistrations((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
    } catch {
      setError('Check-in failed.');
    }
  };

  const getEventName = (eventId: string) =>
    events.find((e) => e.id === eventId)?.title || eventId;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">Registrations</h4>
        <Badge bg="secondary" className="py-2 px-3 fs-6">
          {registrations.length} total
        </Badge>
      </div>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      {/* Filter by event */}
      <Row className="mb-4">
        <Col sm={5}>
          <Form.Select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="">All Events</option>
            {events.map((ev) => (
              <option key={ev.id} value={ev.id}>{ev.title}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {loading ? (
        <div className="text-center py-5"><Spinner animation="border" variant="primary" /></div>
      ) : (
        <div className="card border-0 shadow-sm">
          <Table responsive hover className="mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Event</th>
                <th>Registered</th>
                <th>Status</th>
                <th>Check-in</th>
              </tr>
            </thead>
            <tbody>
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No registrations found.
                  </td>
                </tr>
              ) : (
                registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td className="fw-semibold">
                      {reg.firstName} {reg.lastName}
                    </td>
                    <td>
                      <a href={`mailto:${reg.email}`} className="text-primary">
                        {reg.email}
                      </a>
                    </td>
                    <td className="small">{reg.company || '—'}</td>
                    <td>
                      <span className="small">{getEventName(reg.eventId)}</span>
                    </td>
                    <td className="small">{formatDate(reg.registeredAt)}</td>
                    <td>
                      <Badge
                        bg={
                          reg.status === 'confirmed'
                            ? 'success'
                            : reg.status === 'waitlisted'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {reg.status}
                      </Badge>
                    </td>
                    <td>
                      {reg.checkInTime ? (
                        <span className="text-success small">
                          <PersonCheckFill className="me-1" />
                          {new Date(reg.checkInTime).toLocaleTimeString()}
                        </span>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline-success"
                          onClick={() => handleCheckIn(reg.id)}
                        >
                          Check In
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
}
