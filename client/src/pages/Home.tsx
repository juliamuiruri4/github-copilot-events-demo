import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, InputGroup, Button, Badge } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import type { EventData, EventCategory } from '../types';
import { getEvents } from '../api';
import EventCard from '../components/EventCard';
import { useConfig } from '../context/ConfigContext';

const CATEGORIES: { value: EventCategory | ''; label: string }[] = [
  { value: '', label: 'All Categories' },
  { value: 'conference', label: 'Conference' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'webinar', label: 'Webinar' },
  { value: 'meetup', label: 'Meetup' },
  { value: 'hackathon', label: 'Hackathon' },
];

export default function Home() {
  const { config } = useConfig();
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<EventCategory | ''>(
    (searchParams.get('category') as EventCategory) || ''
  );
  const [showUpcoming, setShowUpcoming] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents({
        category: category || undefined,
        search: search || undefined,
        upcoming: showUpcoming || undefined,
      });
      setEvents(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, showUpcoming]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  const upcomingCount = events.filter((e) => e.status === 'upcoming').length;

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <h1 className="display-5 fw-bold mb-3">{config.tagline}</h1>
              <p className="lead opacity-90 mb-4">{config.description}</p>
              <div className="d-flex gap-3 flex-wrap">
                <Button variant="light" size="lg" onClick={() => setShowUpcoming(true)}>
                  Upcoming Events
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={() => setShowUpcoming(false)}
                >
                  Browse All
                </Button>
              </div>
            </Col>
            <Col lg={5} className="text-center d-none d-lg-block">
              <div className="bg-white bg-opacity-10 rounded-4 p-4">
                <div className="display-1">🎯</div>
                <h4 className="mt-2 text-white">{upcomingCount} Upcoming Events</h4>
                <p className="opacity-75 mb-0">Register today and secure your spot</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main content */}
      <Container className="py-5">
        {/* Filters */}
        <Row className="g-3 mb-4 align-items-end">
          <Col md={5}>
            <Form onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button type="submit" variant="primary">
                  <Search />
                </Button>
              </InputGroup>
            </Form>
          </Col>
          <Col md={3}>
            <Form.Select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory | '')}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md="auto">
            <Form.Check
              type="switch"
              id="upcoming-switch"
              label="Upcoming only"
              checked={showUpcoming}
              onChange={(e) => setShowUpcoming(e.target.checked)}
            />
          </Col>
          <Col md="auto" className="ms-auto">
            <Badge bg="secondary" className="py-2 px-3 fs-6">
              {events.length} event{events.length !== 1 ? 's' : ''}
            </Badge>
          </Col>
        </Row>

        {/* Event grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="mt-2 text-muted">Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-5">
            <div className="display-4">🔍</div>
            <h4 className="mt-3">No events found</h4>
            <p className="text-muted">Try adjusting your filters or search terms.</p>
            <Button
              variant="outline-primary"
              onClick={() => {
                setSearch('');
                setCategory('');
                setShowUpcoming(false);
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <Row xs={1} sm={2} lg={3} className="g-4">
            {events.map((event) => (
              <Col key={event.id}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
