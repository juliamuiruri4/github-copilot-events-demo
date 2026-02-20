import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import type { EventData } from '../types';
import {
  CalendarEvent,
  GeoAlt,
  People,
  CameraVideo,
  CurrencyDollar,
} from 'react-bootstrap-icons';

interface Props {
  event: EventData;
}

function statusLabel(status: EventData['status']) {
  const map: Record<EventData['status'], string> = {
    upcoming: 'Upcoming',
    ongoing: 'Live Now',
    past: 'Past',
    cancelled: 'Cancelled',
  };
  return map[status];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function EventCard({ event }: Props) {
  const spotsLeft = event.capacity - event.registeredCount;
  const pctFull = Math.round((event.registeredCount / event.capacity) * 100);

  return (
    <Card className="event-card">
      <div className="position-relative">
        <img src={event.imageUrl} alt={event.title} className="event-card-img" />
        <span
          className={`badge badge-${event.status} position-absolute top-0 end-0 m-2 px-2 py-1`}
        >
          {statusLabel(event.status)}
        </span>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <span className="category-chip me-2">{event.category}</span>
          {event.isVirtual && (
            <span className="category-chip" style={{ backgroundColor: '#0ea5e9' }}>
              Virtual
            </span>
          )}
        </div>

        <Card.Title className="fw-bold mb-1 fs-6">{event.title}</Card.Title>
        <Card.Text className="text-muted small mb-3 flex-grow-1">
          {event.shortDescription}
        </Card.Text>

        <div className="small text-muted mb-1">
          <CalendarEvent className="me-1" />
          {formatDate(event.date)}
        </div>
        <div className="small text-muted mb-2">
          {event.isVirtual ? (
            <>
              <CameraVideo className="me-1" />
              {event.location}
            </>
          ) : (
            <>
              <GeoAlt className="me-1" />
              {event.location}
            </>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="small text-muted">
            <People className="me-1" />
            {event.registeredCount}/{event.capacity}
            {spotsLeft <= 20 && spotsLeft > 0 && event.status === 'upcoming' && (
              <span className="text-danger ms-1">({spotsLeft} left!)</span>
            )}
          </span>
          <span className="fw-semibold">
            {event.price === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              <>
                <CurrencyDollar size={14} />
                {event.price}
              </>
            )}
          </span>
        </div>

        {/* Capacity bar */}
        <div className="progress mb-3" style={{ height: '4px' }}>
          <div
            className={`progress-bar ${pctFull >= 90 ? 'bg-danger' : 'bg-success'}`}
            style={{ width: `${pctFull}%` }}
          />
        </div>

        <Link to={`/events/${event.id}`} className="btn btn-primary btn-sm mt-auto">
          {event.status === 'upcoming' ? 'View & Register' : 'View Details'}
        </Link>
      </Card.Body>
    </Card>
  );
}
