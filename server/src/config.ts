import { OrgConfig } from './types';

export const defaultConfig: OrgConfig = {
  name: 'MUT Inter-University Tech Day 2026',
  tagline: 'Learn. Connect. Grow.',
  description:
    'The first ever MUT Inter-University Tech Day brings together the brightest students and industry professionals from Murang\'a University of Technology, Kirinyaga University, Dedan Kimathi University, Strathmore University, and Embu University for conversations that go far beyond the classroom. Expect real insights, powerful networking, and the kind of advice that can completely shift how you see your future in tech.',
  primaryColor: '#3f7807',
  secondaryColor: '#8ebe79',
  accentColor: '#c959d3',
  email: 'muttechcommunity@gmail.com',
  socialLinks: {
    twitter: 'https://twitter.com/MUTTechDay',
    linkedin: 'https://linkedin.com/company/mut-tech-community',
  },
};

// In-memory config — modify this at runtime via the admin settings API
let currentConfig: OrgConfig = { ...defaultConfig };

export const getConfig = (): OrgConfig => currentConfig;
export const updateConfig = (updates: Partial<OrgConfig>): OrgConfig => {
  currentConfig = { ...currentConfig, ...updates };
  return currentConfig;
};
