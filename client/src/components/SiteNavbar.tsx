import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useConfig } from '../context/ConfigContext';

export default function SiteNavbar() {
  const { config } = useConfig();
  const location = useLocation();

  return (
    <Navbar className="site-navbar" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
          {config.logoUrl ? (
            <img src={config.logoUrl} alt={config.name} height={32} className="me-2" />
          ) : null}
          {config.name}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === '/'}
            >
              Events
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin"
              active={location.pathname.startsWith('/admin')}
            >
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
