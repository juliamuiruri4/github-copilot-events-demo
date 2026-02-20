import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, Button, Alert, Spinner,
} from 'react-bootstrap';
import { CheckCircleFill, ArrowLeft } from 'react-bootstrap-icons';
import type { EventData, RegistrationFormData } from '../types';
import { getEvent, registerForEvent } from '../api';

export default function Register() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventData | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    dietaryRequirements: '',
  });

  useEffect(() => {
    if (!id) return;
    getEvent(id)
      .then(setEvent)
      .catch(() => setError('Event not found.'))
      .finally(() => setLoadingEvent(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setError('');
    try {
      await registerForEvent({ ...form, eventId: id });
      setSuccess(true);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingEvent) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!event) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Event not found.</Alert>
        <Link to="/">← Back to Events</Link>
      </Container>
    );
  }

  if (success) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <CheckCircleFill size={64} className="text-success mb-3" />
            <h2 className="fw-bold mb-2">You're Registered! 🎉</h2>
            <p className="text-muted mb-1">
              You've successfully registered for <strong>{event.title}</strong>.
            </p>
            <p className="text-muted mb-4">
              A confirmation email will be sent to <strong>{form.email}</strong>.
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <Link to={`/events/${event.id}`} className="btn btn-outline-primary">
                View Event Details
              </Link>
              <Link to="/" className="btn btn-primary">
                Browse More Events
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={7}>
          <Button variant="link" className="text-primary p-0 mb-3" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-1" />
            Back to Event
          </Button>

          <h2 className="fw-bold mb-1">Register for Event</h2>
          <p className="text-muted mb-4">{event.title}</p>

          {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="Jane"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group>
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@example.com"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Inc."
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label>Job Title</Form.Label>
                      <Form.Control
                        name="jobTitle"
                        value={form.jobTitle}
                        onChange={handleChange}
                        placeholder="Software Engineer"
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group>
                      <Form.Label>Dietary Requirements</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="dietaryRequirements"
                        value={form.dietaryRequirements}
                        onChange={handleChange}
                        placeholder="e.g., Vegetarian, Gluten-free..."
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4 pt-2 border-top">
                  <p className="small text-muted mb-3">
                    By registering you agree to our terms of service and privacy policy.
                  </p>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Registering...
                      </>
                    ) : (
                      `Register${event.price > 0 ? ` — $${event.price}` : ' for Free'}`
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
