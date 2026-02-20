import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Badge, Button, Tab, Tabs, Card, Alert,
} from 'react-bootstrap';
import {
  CalendarEvent, GeoAlt, People, CameraVideo, Clock, ArrowLeft, CurrencyDollar,
} from 'react-bootstrap-icons';
import type { EventData } from '../types';
import { getEvent } from '../api';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getEvent(id)
      .then(setEvent)
      .catch(() => setError('Event not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Event not found.'}</Alert>
        <Link to="/">← Back to Events</Link>
      </Container>
    );
  }

  const spotsLeft = event.capacity - event.registeredCount;
  const isFull = spotsLeft <= 0;
  const canRegister = event.status === 'upcoming' && !isFull;

  return (
    <>
      {/* Hero banner */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${event.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px 0',
        }}
      >
        <Container>
          <Button
            variant="link"
            className="text-white p-0 mb-3 opacity-75"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="me-1" />
            Back
          </Button>
          <span className="category-chip mb-3 d-inline-block">{event.category}</span>
          <h1 className="display-5 fw-bold text-white mb-3">{event.title}</h1>
          <div className="d-flex flex-wrap gap-3 text-white opacity-90">
            <span><CalendarEvent className="me-1" />{formatDate(event.date)}</span>
            <span>
              {event.isVirtual ? (
                <><CameraVideo className="me-1" />{event.location}</>
              ) : (
                <><GeoAlt className="me-1" />{event.location}</>
              )}
            </span>
            <span><People className="me-1" />{event.registeredCount}/{event.capacity} registered</span>
            <span>
              {event.price === 0 ? (
                <Badge bg="success" className="fs-6">Free</Badge>
              ) : (
                <Badge bg="warning" text="dark" className="fs-6">
                  <CurrencyDollar />{event.price}
                </Badge>
              )}
            </span>
          </div>
          {event.tags.length > 0 && (
            <div className="mt-3 d-flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} bg="light" text="dark" className="fw-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </Container>
      </div>

      {/* Content */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Main content */}
          <Col lg={8}>
            <Tabs defaultActiveKey="about" className="mb-4">
              <Tab eventKey="about" title="About">
                <div className="pt-3">
                  <h4 className="section-title mb-4">About This Event</h4>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }} className="text-secondary mt-4">
                    {event.description}
                  </div>
                </div>
              </Tab>

              {event.speakers.length > 0 && (
                <Tab eventKey="speakers" title={`Speakers (${event.speakers.length})`}>
                  <div className="pt-3">
                    <h4 className="section-title mb-4">Speakers</h4>
                    <Row xs={1} sm={2} className="g-3 mt-4">
                      {event.speakers.map((s) => (
                        <Col key={s.name}>
                          <Card className="border-0 shadow-sm h-100">
                            <Card.Body>
                              <div>
                                <h6 className="fw-bold mb-0">{s.name}</h6>
                                <p className="small text-primary mb-1">
                                  {s.title} @ {s.company}
                                </p>
                                <p className="small text-muted mb-0">{s.bio}</p>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Tab>
              )}

              {event.schedule.length > 0 && (
                <Tab eventKey="schedule" title="Schedule">
                  <div className="pt-3">
                    <h4 className="section-title mb-4">Event Schedule</h4>
                    <div className="mt-4">
                      {event.schedule.map((item, i) => (
                        <div key={i} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                          <div
                            className="text-primary fw-semibold flex-shrink-0"
                            style={{ width: '60px', fontSize: '0.9rem' }}
                          >
                            {item.time}
                          </div>
                          <div>
                            <p className="fw-semibold mb-0">{item.title}</p>
                            {item.speaker && (
                              <p className="small text-muted mb-0">🎤 {item.speaker}</p>
                            )}
                            <p className="small text-muted mb-0">
                              <Clock className="me-1" size={12} />
                              {item.duration < 60
                                ? `${item.duration} min`
                                : `${Math.floor(item.duration / 60)}h ${item.duration % 60 ? `${item.duration % 60}m` : ''}`}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
              )}
            </Tabs>
          </Col>

          {/* Registration sidebar */}
          <Col lg={4}>
            <Card className="border-0 shadow sticky-top" style={{ top: '80px' }}>
              <Card.Body className="p-4">
                <h5 className="fw-bold mb-3">
                  {event.price === 0 ? 'Free Event' : `$${event.price} per person`}
                </h5>

                {event.status === 'past' && (
                  <Alert variant="secondary" className="small">
                    This event has already taken place.
                  </Alert>
                )}
                {event.status === 'cancelled' && (
                  <Alert variant="danger" className="small">
                    This event has been cancelled.
                  </Alert>
                )}
                {isFull && event.status === 'upcoming' && (
                  <Alert variant="warning" className="small">
                    This event is sold out.
                  </Alert>
                )}

                {canRegister && (
                  <>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between small text-muted mb-1">
                        <span>{event.registeredCount} registered</span>
                        <span>{spotsLeft} spots left</span>
                      </div>
                      <div className="progress" style={{ height: '6px' }}>
                        <div
                          className={`progress-bar ${
                            spotsLeft <= 20 ? 'bg-danger' : 'bg-success'
                          }`}
                          style={{
                            width: `${(event.registeredCount / event.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <Link
                      to={`/events/${event.id}/register`}
                      className="btn btn-primary w-100 py-2"
                    >
                      Register Now
                    </Link>
                  </>
                )}

                <div className="mt-3 pt-3 border-top small text-muted">
                  <div className="mb-2">
                    <CalendarEvent className="me-2" />
                    {formatDate(event.date)} at {formatTime(event.date)}
                  </div>
                  {event.address && (
                    <div className="mb-2">
                      <GeoAlt className="me-2" />
                      {event.address}
                    </div>
                  )}
                  {event.isVirtual && event.virtualLink && canRegister && (
                    <div>
                      <CameraVideo className="me-2" />
                      Virtual — link sent after registration
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
