import { Organization, EventInfo, Registration, GalleryPhoto, ContactInquiry, AdminUser } from '../types';

export const INITIAL_EVENT_INFO: EventInfo = {
  title: 'ADF2027',
  edition: '2027',
  theme: 'A DAY WITH THE FOXES',
  tagline: 'Rooted In Code, Driven By Purpose.',
  aboutText: 'ADF (A Day With Foxes) Is An Annual School Of Computing Event Designed To Allow Students, Especially Incoming And Non-Major Students, To Experience The Culture, Activities, Specialisations, And Student Organizations Within The School Of Computing.',
  showcaseOrgs: [
    'Cybersecurity Organization',
    'Mafia Organization',
    'Code Geeks',
    'Loop'
  ],
  dateRange: 'February 23-24, 2027',
  timeRange: '9:00am To 4:00pm',
  venue: 'SJH Building',
  coordinators: 'Dr. Mary Jane Rabena And Sir Bon Flores',
  whatToExpect: 'Each Organization Prepares Interactive Booths, Demonstrations, Games, Exhibits, And Activities Related To Their Specialization.',
  videoTitle: 'ADF2027 A DAY WITH THE FOXES',
  videoPurpose: 'The purpose of the video is to persuade visitors to explore the School of Computing and encourage them to participate in ADF2027.',
  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-41484-large.mp4',
  readyText: 'Experience games, activities, organizations, and the School of Computing community.'
};

export const INITIAL_ORGANIZATIONS: Organization[] = [
  {
    id: 1,
    name: 'CODE GEEKS',
    acronym: 'CG',
    category: 'Software Engineering',
    iconType: 'code',
    description: 'CODE GEEKS IS A STUDENT ORGANIZATION FOR ASPIRING PROGRAMMERS AND SOFTWARE DEVELOPERS. MEMBERS ENHANCE THEIR CODING SKILLS THROUGH PROGRAMMING WORKSHOPS, CODING COMPETITIONS, COLLABORATIVE PROJECTS, AND TECHNOLOGY-FOCUSED EVENTS WHILE BUILDING A SUPPORTIVE COMMUNITY OF FUTURE DEVELOPERS.',
    tagline: 'Coding The Future Byte by Byte',
    memberCount: 140,
    featured: true,
    boothLocation: 'SJH 2nd Floor Lobby'
  },
  {
    id: 2,
    name: 'CYBERSECURITY INTELLIGENCE ALLIANCE',
    acronym: 'CSIA',
    category: 'Cybersecurity & Networks',
    iconType: 'shield',
    description: 'THE CYBERSECURITY INTELLIGENCE ALLIANCE (CSIA) PROMOTES CYBERSECURITY AWARENESS THROUGH ENGAGING WORKSHOPS, HANDS-ON ACTIVITIES, AND EDUCATIONAL PROGRAMS THAT EQUIP STUDENTS WITH THE KNOWLEDGE AND PRACTICAL SKILLS NEEDED TO BECOME FUTURE ETHICAL CYBERSECURITY PROFESSIONALS.',
    tagline: 'Defend, Secure, Protect',
    memberCount: 115,
    featured: true,
    boothLocation: 'SJH Cyber Lab 304'
  },
  {
    id: 3,
    name: 'MULTIMEDIA AFICIONADOS FOR INTERESTED ARTISTS (MAFIA)',
    acronym: 'MAFIA',
    category: 'Digital Arts & Animation',
    iconType: 'media',
    description: 'MULTIMEDIA AFICIONADOS FOR INTERESTED ARTISTS (MAFIA) PROVIDES A CREATIVE SPACE WHERE STUDENTS DEVELOP THEIR TALENTS IN GRAPHIC DESIGN, PHOTOGRAPHY, VIDEOGRAPHY, ANIMATION, AND DIGITAL STORYTELLING WHILE COLLABORATING WITH FELLOW ARTISTS ON EXCITING MULTIMEDIA PROJECTS.',
    tagline: 'Where Creativity Meets Computation',
    memberCount: 185,
    featured: true,
    boothLocation: 'SJH Multimedia Hall'
  },
  {
    id: 4,
    name: 'LOOP',
    acronym: 'LOOP',
    category: 'Leadership & Competitions',
    iconType: 'loop',
    description: 'LOOP IS A STUDENT-LED ORGANIZATION UNDER THE SCHOOL OF COMPUTING DEDICATED TO HELPING STUDENTS GROW THEIR TECHNICAL SKILLS AND EXPAND THEIR PROFESSIONAL NETWORK. THROUGH CODING COMPETITIONS, AND COLLABORATIVE EVENTS, LOOP CREATES OPPORTUNITIES FOR MEMBERS TO LEARN, AND CONNECT WITH THE COMPUTING COMMUNITY.',
    tagline: 'Iterate, Innovate, Elevate',
    memberCount: 130,
    featured: true,
    boothLocation: 'SJH Ground Plaza'
  }
];

export const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: 1,
    studentId: '2023-10492',
    fullName: 'Juan Carlo Santos',
    email: 'jcsantos@hau.edu.ph',
    yearLevel: '1st Year',
    program: 'BS Information Technology',
    preferredOrg: 'Code Geeks',
    status: 'Confirmed',
    createdAt: '2027-02-10 10:15:22'
  },
  {
    id: 2,
    studentId: '2024-08219',
    fullName: 'Maria Angela Dizon',
    email: 'madizon@hau.edu.ph',
    yearLevel: 'Incoming Freshman',
    program: 'BS Computer Science',
    preferredOrg: 'Cybersecurity Intelligence Alliance',
    status: 'Confirmed',
    createdAt: '2027-02-11 14:32:05'
  },
  {
    id: 3,
    studentId: '2022-19401',
    fullName: 'Rafael De Leon',
    email: 'rdeleon@hau.edu.ph',
    yearLevel: '2nd Year',
    program: 'BS Entertainment & Multimedia Computing',
    preferredOrg: 'Multimedia Aficionados for Interested Artists (MAFIA)',
    status: 'Pending',
    createdAt: '2027-02-12 09:44:11'
  },
  {
    id: 4,
    studentId: '2023-11882',
    fullName: 'Chloe Bianca Pineda',
    email: 'cpineda@hau.edu.ph',
    yearLevel: '1st Year',
    program: 'BS Computer Science',
    preferredOrg: 'Loop',
    status: 'Confirmed',
    createdAt: '2027-02-13 16:20:49'
  },
  {
    id: 5,
    studentId: '2024-00124',
    fullName: 'Mark Vincent David',
    email: 'mvdavid@hau.edu.ph',
    yearLevel: 'Senior High School (STEM)',
    program: 'BS Information Technology',
    preferredOrg: 'Code Geeks',
    status: 'Pending',
    createdAt: '2027-02-14 11:05:30'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 1,
    title: 'Future Tech Showcase',
    caption: 'Interactive student presentations - "We Are The Future"',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=700&q=80',
    tag: 'Demonstrations',
    rotationDeg: -3
  },
  {
    id: 2,
    title: 'Packed SOC Auditorium',
    caption: 'Incoming and non-major students filling the main hall',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=700&q=80',
    tag: 'Plenary',
    rotationDeg: 2
  },
  {
    id: 3,
    title: 'Fox Mascot Campus Parade',
    caption: 'Fox mascot and student leaders welcoming everyone!',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=700&q=80',
    tag: 'Parade',
    rotationDeg: -1
  }
];

export const INITIAL_INQUIRIES: ContactInquiry[] = [
  {
    id: 1,
    fullName: 'Kenneth Paul Manaloto',
    email: 'kpmanaloto@gmail.com',
    subject: 'Open to Non-Computing Students?',
    message: 'Good day! Can Engineering students like me attend the cybersecurity workshop booths on day 2?',
    status: 'Read',
    createdAt: '2027-02-15 08:30:12'
  },
  {
    id: 2,
    fullName: 'Alyssa Marie Cortez',
    email: 'acortez@student.hau.edu.ph',
    subject: 'Booth Certificate / Attendance Validation',
    message: 'Hello Dr. Mary Jane and Sir Bon, will certificates of participation be issued for the afternoon gaming sessions?',
    status: 'Unread',
    createdAt: '2027-02-16 13:14:50'
  }
];

export const INITIAL_ADMIN: AdminUser = {
  id: 1,
  username: 'admin',
  fullName: 'Dr. Mary Jane Rabena',
  role: 'Super Admin',
  email: 'mjrabena@hau.edu.ph'
};
