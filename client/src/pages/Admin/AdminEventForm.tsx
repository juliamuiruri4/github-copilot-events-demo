import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Form, Button, Alert, Spinner, Card,
} from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import type { EventData, EventCategory, EventStatus } from '../../types';
import { getEvent, adminCreateEvent, adminUpdateEvent } from '../../api';

const CATEGORIES: EventCategory[] = ['conference', 'webinar', 'workshop', 'meetup', 'hackathon'];
const STATUSES: EventStatus[] = ['upcoming', 'ongoing', 'past', 'cancelled'];

export default function AdminEventForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id && id !== 'new';

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<Partial<EventData>>({
    title: '',
    shortDescription: '',
    description: '',
    category: 'conference',
    status: 'upcoming',
    date: '',
    endDate: '',
    location: '',
    isVirtual: false,
    capacity: 100,
    price: 0,
    imageUrl: '',
    tags: [],
  });

  useEffect(() => {
    if (isEdit && id) {
      getEvent(id)
        .then((ev) => setForm(ev))
        .catch(() => setError('Event not found.'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : type === 'number'
        ? Number(value)
        : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      if (isEdit && id) {
        await adminUpdateEvent(id, form);
      } else {
        await adminCreateEvent(form);
      }
      navigate('/admin/events');
    } catch {
      setError('Failed to save event. Please check all required fields.');
    } finally {
      setSubmitting(false);
    }
  };

  const toLocalDateInput = (iso?: string) => (iso ? iso.slice(0, 16) : '');

  if (loading) {
    return <Container className="py-5 text-center"><Spinner animation="border" variant="primary" /></Container>;
  }

  return (
    <Container fluid className="p-4">
      <Button variant="link" className="text-primary p-0 mb-3" onClick={() => navigate(-1)}>
        <ArrowLeft className="me-1" />Back to Events
      </Button>
      <h4 className="fw-bold mb-4">{isEdit ? 'Edit Event' : 'Create New Event'}</h4>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              {/* Basic Info */}
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Event Title *</Form.Label>
                  <Form.Control
                    name="title"
                    value={form.title || ''}
                    onChange={handleChange}
                    required
                    placeholder="e.g., React Summit 2026"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Short Description *</Form.Label>
                  <Form.Control
                    name="shortDescription"
                    value={form.shortDescription || ''}
                    onChange={handleChange}
                    required
                    placeholder="One-line summary shown on event cards"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="description"
                    value={form.description || ''}
                    onChange={handleChange}
                    placeholder="Detailed description of the event..."
                  />
                </Form.Group>
              </Col>

              {/* Category & Status */}
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Category *</Form.Label>
                  <Form.Select name="category" value={form.category || 'conference'} onChange={handleChange}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Status *</Form.Label>
                  <Form.Select name="status" value={form.status || 'upcoming'} onChange={handleChange}>
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Dates */}
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Start Date & Time *</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="date"
                    value={toLocalDateInput(form.date)}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>End Date & Time *</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="endDate"
                    value={toLocalDateInput(form.endDate)}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              {/* Location */}
              <Col sm={8}>
                <Form.Group>
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    name="location"
                    value={form.location || ''}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Seattle Convention Center, Seattle, WA"
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group className="mt-4 pt-2">
                  <Form.Check
                    type="switch"
                    id="is-virtual"
                    name="isVirtual"
                    label="Virtual Event"
                    checked={!!form.isVirtual}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              {form.isVirtual && (
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Virtual Event Link</Form.Label>
                    <Form.Control
                      name="virtualLink"
                      value={(form as EventData).virtualLink || ''}
                      onChange={handleChange}
                      placeholder="https://zoom.us/..."
                    />
                  </Form.Group>
                </Col>
              )}

              {/* Capacity & Price */}
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    value={form.capacity || 100}
                    onChange={handleChange}
                    min={1}
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Price ($)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={form.price ?? 0}
                    onChange={handleChange}
                    min={0}
                  />
                </Form.Group>
              </Col>

              {/* Image */}
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Event Image URL</Form.Label>
                  <Form.Control
                    name="imageUrl"
                    value={form.imageUrl || ''}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                  />
                </Form.Group>
              </Col>

              {/* Tags */}
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Tags (comma separated)</Form.Label>
                  <Form.Control
                    name="tags"
                    value={(form.tags || []).join(', ')}
                    onChange={handleTagsChange}
                    placeholder="React, TypeScript, Frontend"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4 pt-2 border-top">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? <><Spinner size="sm" className="me-2" />Saving...</> : (isEdit ? 'Save Changes' : 'Create Event')}
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate('/admin/events')}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
