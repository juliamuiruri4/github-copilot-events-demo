import axios from 'axios';
import type { EventData, Registration, OrgConfig, RegistrationFormData, EventCategory, EventStatus } from '../types';

const api = axios.create({ baseURL: '/api' });

// Events
export const getEvents = (params?: {
  category?: EventCategory;
  status?: EventStatus;
  search?: string;
  upcoming?: boolean;
}) => api.get<EventData[]>('/events', { params }).then((r) => r.data);

export const getEvent = (id: string) => api.get<EventData>(`/events/${id}`).then((r) => r.data);

// Registration
export const registerForEvent = (data: RegistrationFormData & { eventId: string }) =>
  api.post<Registration>('/register', data).then((r) => r.data);

// Config
export const getConfig = () => api.get<OrgConfig>('/config').then((r) => r.data);
export const updateConfig = (data: Partial<OrgConfig>) =>
  api.put<OrgConfig>('/config', data).then((r) => r.data);

// Admin — Events
export const adminGetEvents = () => api.get<EventData[]>('/admin/events').then((r) => r.data);
export const adminCreateEvent = (data: Partial<EventData>) =>
  api.post<EventData>('/admin/events', data).then((r) => r.data);
export const adminUpdateEvent = (id: string, data: Partial<EventData>) =>
  api.put<EventData>(`/admin/events/${id}`, data).then((r) => r.data);
export const adminDeleteEvent = (id: string) =>
  api.delete(`/admin/events/${id}`).then((r) => r.data);

// Admin — Registrations
export const adminGetRegistrations = (eventId?: string) =>
  eventId
    ? api.get<Registration[]>(`/admin/registrations/${eventId}`).then((r) => r.data)
    : api.get<Registration[]>('/admin/registrations').then((r) => r.data);

export const adminCheckIn = (registrationId: string) =>
  api.patch<Registration>(`/admin/registrations/${registrationId}/checkin`).then((r) => r.data);
