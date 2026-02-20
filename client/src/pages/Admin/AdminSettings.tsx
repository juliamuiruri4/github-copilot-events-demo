import { useState, useEffect } from 'react';
import {
  Container, Row, Col, Form, Button, Alert, Spinner, Card,
} from 'react-bootstrap';
import { CheckCircleFill } from 'react-bootstrap-icons';
import type { OrgConfig } from '../../types';
import { getConfig, updateConfig } from '../../api';
import { useConfig } from '../../context/ConfigContext';

export default function AdminSettings() {
  const { refreshConfig } = useConfig();
  const [form, setForm] = useState<OrgConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getConfig()
      .then(setForm)
      .catch(() => setError('Failed to load settings.'))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('socialLinks.')) {
      const key = name.split('.')[1];
      setForm((prev) =>
        prev ? { ...prev, socialLinks: { ...prev.socialLinks, [key]: value } } : prev
      );
    } else {
      setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      await updateConfig(form);
      await refreshConfig();
      setSuccess(true);
    } catch {
      setError('Failed to save settings.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!form) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || 'Failed to load settings.'}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <h4 className="fw-bold mb-4">Organization Settings</h4>
      <p className="text-muted mb-4">
        Customize this site for your event. Changes apply immediately to the public-facing site.
      </p>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && (
        <Alert variant="success" className="d-flex align-items-center gap-2">
          <CheckCircleFill /> Settings saved and applied successfully!
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col xs={12}><h6 className="fw-semibold text-muted text-uppercase small mb-0">Organization Identity</h6></Col>

              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., ReactConf 2026"
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Tagline</Form.Label>
                  <Form.Control
                    name="tagline"
                    value={form.tagline}
                    onChange={handleChange}
                    placeholder="e.g., Where Developers Come Together"
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Contact Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
                <Form.Group>
                  <Form.Label>Logo URL</Form.Label>
                  <Form.Control
                    name="logoUrl"
                    value={form.logoUrl || ''}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </Form.Group>
              </Col>

              <Col xs={12} className="mt-2">
                <hr />
                <h6 className="fw-semibold text-muted text-uppercase small mb-0">Brand Colors</h6>
              </Col>

              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Primary Color</Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Control
                      type="color"
                      name="primaryColor"
                      value={form.primaryColor}
                      onChange={handleChange}
                      style={{ width: '50px', height: '38px', padding: '2px' }}
                    />
                    <Form.Control
                      name="primaryColor"
                      value={form.primaryColor}
                      onChange={handleChange}
                      placeholder="#5344b5"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Secondary Color</Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Control
                      type="color"
                      name="secondaryColor"
                      value={form.secondaryColor}
                      onChange={handleChange}
                      style={{ width: '50px', height: '38px', padding: '2px' }}
                    />
                    <Form.Control
                      name="secondaryColor"
                      value={form.secondaryColor}
                      onChange={handleChange}
                      placeholder="#3a2f8f"
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Accent Color</Form.Label>
                  <div className="d-flex gap-2 align-items-center">
                    <Form.Control
                      type="color"
                      name="accentColor"
                      value={form.accentColor}
                      onChange={handleChange}
                      style={{ width: '50px', height: '38px', padding: '2px' }}
                    />
                    <Form.Control
                      name="accentColor"
                      value={form.accentColor}
                      onChange={handleChange}
                      placeholder="#f97316"
                    />
                  </div>
                </Form.Group>
              </Col>

              {/* Color preview */}
              <Col xs={12}>
                <div className="d-flex gap-3 mt-1">
                  <div
                    className="rounded px-4 py-2 text-white small fw-semibold"
                    style={{ backgroundColor: form.primaryColor }}
                  >
                    Primary
                  </div>
                  <div
                    className="rounded px-4 py-2 text-white small fw-semibold"
                    style={{ backgroundColor: form.secondaryColor }}
                  >
                    Secondary
                  </div>
                  <div
                    className="rounded px-4 py-2 text-white small fw-semibold"
                    style={{ backgroundColor: form.accentColor }}
                  >
                    Accent
                  </div>
                </div>
              </Col>

              <Col xs={12} className="mt-2">
                <hr />
                <h6 className="fw-semibold text-muted text-uppercase small mb-0">Social Links</h6>
              </Col>

              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Twitter URL</Form.Label>
                  <Form.Control
                    name="socialLinks.twitter"
                    value={form.socialLinks.twitter || ''}
                    onChange={handleChange}
                    placeholder="https://twitter.com/..."
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>LinkedIn URL</Form.Label>
                  <Form.Control
                    name="socialLinks.linkedin"
                    value={form.socialLinks.linkedin || ''}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/..."
                  />
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>GitHub URL</Form.Label>
                  <Form.Control
                    name="socialLinks.github"
                    value={form.socialLinks.github || ''}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex gap-2 mt-4 pt-3 border-top">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? <><Spinner size="sm" className="me-2" />Saving...</> : 'Save Settings'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
