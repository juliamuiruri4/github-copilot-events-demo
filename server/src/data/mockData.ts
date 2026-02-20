import { v4 as uuidv4 } from 'uuid';
import { Event, Registration } from '../types';

export const events: Event[] = [
  {
    id: '1a2b3c4d-0001',
    title: 'MUT Inter-University Tech Day 2026',
    slug: 'mut-inter-university-tech-day-2026',
    shortDescription:
      'The first ever MUT Inter-University Tech Day — bringing together students and industry professionals for real insights, powerful networking, and career-shifting conversations.',
    description: `MUT Inter-University Tech Day brings together some of the brightest students and industry professionals for conversations that go far beyond the classroom.

Students from Murang'a University of Technology, Kirinyaga University, Dedan Kimathi University of Technology, Strathmore University, and Embu University will converge at MUT Maina Campus for a full day of talks covering Data Science, AI & Machine Learning, Cybersecurity, and how to interview for software engineering roles.

Expect real insights. Expect powerful networking. Expect the kind of advice that can completely shift how you see your future in tech.

With 200 seats secured, this is not just another event — it's a room full of ambition, opportunity, and forward thinkers. Come ready to learn, ready to connect, and ready to grow.

Organised by MUT Tech Community with support from Microsoft, Dr. John Ndia (Dean of School of Computing and Information Technology), Dr. Wanjiru Njuki (Innovations Coordinator of SCIT), and Mr. John Nduhiyu.

For more info contact: Max (+254-708-762-945) or Steven (+254-768-216-484). #MUTTECHDAY`,
    category: 'conference',
    status: 'upcoming',
    date: '2026-02-21T04:30:00Z',
    endDate: '2026-02-21T14:00:00Z',
    location: 'Assembly Hall, Murang\'a University of Technology',
    address: 'Murang\'a University of Technology, Maina Campus, Murang\'a, Kenya',
    isVirtual: false,
    capacity: 200,
    registeredCount: 187,
    price: 0,
    imageUrl: 'https://images.unsplash.com/photo-1620829813573-7c9e1877706f?w=800&q=80',
    tags: ['Data Science', 'AI', 'Machine Learning', 'Cybersecurity', 'Interviews', 'Cloud', 'Microsoft'],
    speakers: [
      {
        name: 'Julia Muiruri',
        title: 'Cloud Advocate',
        company: 'Microsoft',
        bio: 'Julia is a Cloud Advocate at Microsoft, passionate about empowering developers across Africa with cloud technologies and AI tools.',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=JuliaMuiruri&skinColor=9e5622&flip=true',
      },
      {
        name: 'Joylynn Kirui',
        title: 'Cybersecurity Expert',
        company: '',
        bio: 'Joylynn is a cybersecurity specialist with deep expertise in threat analysis, ethical hacking, and building secure systems.',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=JoylynnKirui&skinColor=76422e',
      },
      {
        name: 'Mark Gatere',
        title: 'Software Engineer',
        company: '',
        bio: 'Mark is a software engineer building scalable web applications. He is passionate about mentoring young developers in the Kenyan tech ecosystem.',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=MarkGatere&skinColor=c68642',
      },
      {
        name: 'Stephen Karanja',
        title: 'Software Engineer',
        company: 'Microsoft',
        bio: 'Stephen is a Software Engineer at Microsoft, working on developer tools and cloud infrastructure. He is an active mentor in the Kenyan developer community.',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=StephenKaranja&skinColor=9e5622',
      },
      {
        name: 'Bethany Jepchumba',
        title: 'AI Cloud Advocate',
        company: 'Microsoft',
        bio: 'Bethany is an AI Cloud Advocate at Microsoft, focused on making artificial intelligence accessible to developers and students across Africa.',
        avatarUrl: 'https://api.dicebear.com/9.x/adventurer/svg?seed=BethanyJepchumba&skinColor=76422e&flip=true',
      },
    ],
    schedule: [
      { time: '07:30', title: 'Registration & Arrival', duration: 30 },
      { time: '08:00', title: 'Opening Remarks — Dean, School of Computing & IT', duration: 20 },
      { time: '08:20', title: 'Cloud Computing & Developer Opportunities', speaker: 'Julia Muiruri', duration: 45 },
      { time: '09:05', title: 'AI & Machine Learning for Students', speaker: 'Bethany Jepchumba', duration: 45 },
      { time: '09:50', title: 'Tea Break & Networking', duration: 20 },
      { time: '10:10', title: 'Cybersecurity in the Modern World', speaker: 'Joylynn Kirui', duration: 45 },
      { time: '10:55', title: 'Building Scalable Software — Lessons from the Field', speaker: 'Mark Gatere', duration: 45 },
      { time: '11:40', title: 'How to Interview for Software Engineering Roles', speaker: 'Stephen Karanja', duration: 45 },
      { time: '12:25', title: 'Lunch Break', duration: 60 },
      { time: '13:25', title: 'Panel Discussion: Navigating Your Tech Career', speaker: 'Julia Muiruri, Joylynn Kirui, Mark Gatere, Stephen Karanja, Bethany Jepchumba', duration: 45 },
      { time: '14:10', title: 'Q&A, Networking & Closing Remarks', duration: 50 },
    ],
    createdAt: '2026-01-10T10:00:00Z',
  },
];

export const registrations: Registration[] = [
  {
    id: uuidv4(),
    eventId: '1a2b3c4d-0001',
    firstName: 'Wanjiku',
    lastName: 'Mwangi',
    email: 'wanjiku.mwangi@students.mut.ac.ke',
    company: "Murang'a University of Technology",
    jobTitle: 'BSc Computer Science — 3rd Year',
    registeredAt: '2026-02-01T09:00:00Z',
    status: 'confirmed',
  },
  {
    id: uuidv4(),
    eventId: '1a2b3c4d-0001',
    firstName: 'Brian',
    lastName: 'Ochieng',
    email: 'brian.ochieng@students.dkut.ac.ke',
    company: 'Dedan Kimathi University of Technology',
    jobTitle: 'BSc Software Engineering — 4th Year',
    registeredAt: '2026-02-03T11:30:00Z',
    status: 'confirmed',
  },
  {
    id: uuidv4(),
    eventId: '1a2b3c4d-0001',
    firstName: 'Amina',
    lastName: 'Hassan',
    email: 'amina.hassan@students.strathmore.edu',
    company: 'Strathmore University',
    jobTitle: 'BSc Informatics & Computer Science — 2nd Year',
    registeredAt: '2026-02-05T14:00:00Z',
    status: 'confirmed',
  },
  {
    id: uuidv4(),
    eventId: '1a2b3c4d-0001',
    firstName: 'Kevin',
    lastName: 'Kiprop',
    email: 'kevin.kiprop@students.kyu.ac.ke',
    company: 'Kirinyaga University',
    jobTitle: 'BSc Information Technology — 3rd Year',
    registeredAt: '2026-02-08T10:00:00Z',
    status: 'confirmed',
  },
  {
    id: uuidv4(),
    eventId: '1a2b3c4d-0001',
    firstName: 'Grace',
    lastName: 'Njeri',
    email: 'grace.njeri@students.embu.ac.ke',
    company: 'Embu University',
    jobTitle: 'BSc Computer Science — 4th Year',
    registeredAt: '2026-02-10T08:00:00Z',
    status: 'confirmed',
  },
];
