import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Twitter, Linkedin, Github, Envelope } from 'react-bootstrap-icons';
import { useConfig } from '../context/ConfigContext';

export default function Footer() {
  const { config } = useConfig();

  return (
    <footer className="site-footer mt-5 py-5">
      <Container>
        <Row className="g-4">
          <Col md={4}>
            <h5 className="fw-bold text-white mb-2">{config.name}</h5>
            <p className="small mb-3">{config.tagline}</p>
            <div className="d-flex gap-3">
              {config.socialLinks.twitter && (
                <a href={config.socialLinks.twitter} target="_blank" rel="noreferrer">
                  <Twitter size={20} />
                </a>
              )}
              {config.socialLinks.linkedin && (
                <a href={config.socialLinks.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin size={20} />
                </a>
              )}
              {config.socialLinks.github && (
                <a href={config.socialLinks.github} target="_blank" rel="noreferrer">
                  <Github size={20} />
                </a>
              )}
            </div>
          </Col>
          <Col md={4}>
            <h6 className="fw-semibold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="site-footer-link">All Events</Link></li>
              <li><Link to="/?status=upcoming" className="site-footer-link">Upcoming Events</Link></li>
              <li><Link to="/?category=workshop" className="site-footer-link">Workshops</Link></li>
              <li><Link to="/?category=webinar" className="site-footer-link">Webinars</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h6 className="fw-semibold text-white mb-3">Contact</h6>
            <p className="small mb-1">
              <Envelope className="me-2" />
              <a href={`mailto:${config.email}`}>{config.email}</a>
            </p>
          </Col>
        </Row>
        <hr className="border-secondary mt-4" />
        <p className="text-center small mb-0">
          &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
