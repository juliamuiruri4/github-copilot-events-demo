export interface Speaker {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatarUrl?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
  duration: number; // minutes
}

export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled';
export type EventCategory = 'conference' | 'webinar' | 'workshop' | 'meetup' | 'hackathon';

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: EventCategory;
  status: EventStatus;
  date: string; // ISO date string
  endDate: string;
  location: string;
  address?: string;
  isVirtual: boolean;
  virtualLink?: string;
  capacity: number;
  registeredCount: number;
  price: number; // 0 for free
  imageUrl: string;
  tags: string[];
  speakers: Speaker[];
  schedule: ScheduleItem[];
  createdAt: string;
}

export interface Registration {
  id: string;
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  jobTitle?: string;
  dietaryRequirements?: string;
  registeredAt: string;
  checkInTime?: string;
  status: 'confirmed' | 'waitlisted' | 'cancelled';
}

export interface OrgConfig {
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  websiteUrl?: string;
  email: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}
