export interface Organization {
  id: number;
  name: string;
  acronym: string;
  category: string;
  iconType: 'code' | 'shield' | 'media' | 'loop' | 'custom';
  description: string;
  tagline?: string;
  logoUrl?: string;
  memberCount: number;
  featured: boolean;
  boothLocation?: string;
}

export interface EventInfo {
  title: string;
  edition: string;
  theme: string;
  tagline: string;
  aboutText: string;
  showcaseOrgs: string[];
  dateRange: string;
  timeRange: string;
  venue: string;
  coordinators: string;
  whatToExpect: string;
  videoTitle: string;
  videoPurpose: string;
  videoUrl: string;
  readyText: string;
}

export interface Registration {
  id: number;
  studentId: string;
  fullName: string;
  email: string;
  yearLevel: string;
  program: string;
  preferredOrg: string;
  status: 'Pending' | 'Confirmed' | 'Attended';
  createdAt: string;
}

export interface GalleryPhoto {
  id: number;
  title: string;
  caption: string;
  imageUrl: string;
  tag: string;
  rotationDeg: number;
}

export interface ContactInquiry {
  id: number;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Read' | 'Resolved';
  createdAt: string;
}

export interface AdminUser {
  id: number;
  username: string;
  fullName: string;
  role: 'Super Admin' | 'Event Coordinator';
  email: string;
}
