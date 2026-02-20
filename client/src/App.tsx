import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import SiteNavbar from './components/SiteNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import Register from './pages/Register';
import AdminLayout from './pages/Admin/AdminLayout';
import AdminEvents from './pages/Admin/AdminEvents';
import AdminEventForm from './pages/Admin/AdminEventForm';
import AdminRegistrations from './pages/Admin/AdminRegistrations';
import AdminSettings from './pages/Admin/AdminSettings';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNavbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PublicLayout>
              <EventDetail />
            </PublicLayout>
          }
        />
        <Route
          path="/events/:id/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/events" replace />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<AdminEventForm />} />
          <Route path="events/:id/edit" element={<AdminEventForm />} />
          <Route path="registrations" element={<AdminRegistrations />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
