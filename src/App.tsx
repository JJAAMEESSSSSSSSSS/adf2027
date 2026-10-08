import React, { useState, useEffect } from 'react';
import { 
  Organization, 
  EventInfo, 
  Registration, 
  GalleryPhoto, 
  ContactInquiry, 
  AdminUser 
} from './types';
import { 
  INITIAL_EVENT_INFO, 
  INITIAL_ORGANIZATIONS, 
  INITIAL_REGISTRATIONS, 
  INITIAL_GALLERY, 
  INITIAL_INQUIRIES, 
  INITIAL_ADMIN 
} from './data/initialData';

// Public Components
import { Navbar } from './components/public/Navbar';
import { HeroSection } from './components/public/HeroSection';
import { EventDetailsSection } from './components/public/EventDetailsSection';
import { OrganizationsSection } from './components/public/OrganizationsSection';
import { VideoSection } from './components/public/VideoSection';
import { ReadyJoinSection } from './components/public/ReadyJoinSection';
import { Footer } from './components/public/Footer';
import { FoxAdventureModal } from './components/public/FoxAdventureModal';
import { OrgDetailsModal } from './components/public/OrgDetailsModal';
import { ContactModal } from './components/public/ContactModal';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { LoginModal } from './components/admin/LoginModal';

export default function App() {
  // State Initialization with LocalStorage persistence
  const [eventInfo, setEventInfo] = useState<EventInfo>(() => {
    const saved = localStorage.getItem('adf2027_eventInfo');
    return saved ? JSON.parse(saved) : INITIAL_EVENT_INFO;
  });

  const [organizations, setOrganizations] = useState<Organization[]>(() => {
    const saved = localStorage.getItem('adf2027_organizations');
    return saved ? JSON.parse(saved) : INITIAL_ORGANIZATIONS;
  });

  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('adf2027_registrations');
    return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
  });

  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    const saved = localStorage.getItem('adf2027_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('adf2027_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('adf2027_admin_auth') === 'true';
  });
  const [adminUser] = useState<AdminUser>(INITIAL_ADMIN);
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdventureModalOpen, setIsAdventureModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('adf2027_eventInfo', JSON.stringify(eventInfo));
  }, [eventInfo]);

  useEffect(() => {
    localStorage.setItem('adf2027_organizations', JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem('adf2027_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('adf2027_gallery', JSON.stringify(galleryPhotos));
  }, [galleryPhotos]);

  useEffect(() => {
    localStorage.setItem('adf2027_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('adf2027_admin_auth', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Public Navigation Smooth Scroll
  const handleNavigate = (sectionId: string) => {
    if (currentView === 'admin') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Auth Handlers
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setIsLoginModalOpen(false);
    setCurrentView('admin');
  };

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setCurrentView('public');
  };

  // Public Registration Handler
  const handleRegisterStudent = (regData: Omit<Registration, 'id' | 'createdAt' | 'status'>) => {
    const newReg: Registration = {
      ...regData,
      id: Date.now(),
      status: 'Confirmed',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setRegistrations(prev => [newReg, ...prev]);
  };

  // Public Inquiry Handler
  const handleSubmitInquiry = (inquiryData: Omit<ContactInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: ContactInquiry = {
      ...inquiryData,
      id: Date.now(),
      status: 'Unread',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setInquiries(prev => [newInq, ...prev]);
  };

  // Organizations CRUD
  const handleAddOrg = (newOrg: Omit<Organization, 'id'>) => {
    const org: Organization = {
      ...newOrg,
      id: Date.now()
    };
    setOrganizations(prev => [...prev, org]);
  };

  const handleUpdateOrg = (updatedOrg: Organization) => {
    setOrganizations(prev => prev.map(o => o.id === updatedOrg.id ? updatedOrg : o));
  };

  const handleDeleteOrg = (id: number) => {
    setOrganizations(prev => prev.filter(o => o.id !== id));
  };

  // Registrations CRUD
  const handleUpdateRegistrationStatus = (id: number, status: 'Pending' | 'Confirmed' | 'Attended') => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleDeleteRegistration = (id: number) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  // Event Settings Update
  const handleUpdateEventInfo = (newInfo: EventInfo) => {
    setEventInfo(newInfo);
  };

  // Gallery CRUD
  const handleAddGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: Date.now()
    };
    setGalleryPhotos(prev => [...prev, newPhoto]);
  };

  const handleDeleteGalleryPhoto = (id: number) => {
    setGalleryPhotos(prev => prev.filter(p => p.id !== id));
  };

  // Inquiries CRUD
  const handleUpdateInquiryStatus = (id: number, status: 'Unread' | 'Read' | 'Resolved') => {
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const handleDeleteInquiry = (id: number) => {
    setInquiries(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#160803] text-white selection:bg-[#E65A15] selection:text-white">
      {currentView === 'admin' && isAdminLoggedIn ? (
        /* Back-Office CMS Admin Portal */
        <AdminLayout
          admin={adminUser}
          organizations={organizations}
          registrations={registrations}
          galleryPhotos={galleryPhotos}
          inquiries={inquiries}
          eventInfo={eventInfo}
          onLogout={handleLogout}
          onExitToPublic={() => setCurrentView('public')}
          onAddOrg={handleAddOrg}
          onUpdateOrg={handleUpdateOrg}
          onDeleteOrg={handleDeleteOrg}
          onUpdateRegistrationStatus={handleUpdateRegistrationStatus}
          onDeleteRegistration={handleDeleteRegistration}
          onUpdateEventInfo={handleUpdateEventInfo}
          onAddGalleryPhoto={handleAddGalleryPhoto}
          onDeleteGalleryPhoto={handleDeleteGalleryPhoto}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      ) : (
        /* Public Event Portal matching Screenshots 1, 2, and 3 */
        <div className="flex flex-col min-h-screen">
          <Navbar
            onNavigate={handleNavigate}
            onOpenAdmin={handleOpenAdmin}
            onOpenContact={() => setIsContactModalOpen(true)}
          />

          <main className="flex-grow">
            <HeroSection
              eventInfo={eventInfo}
              onOpenAdventure={() => setIsAdventureModalOpen(true)}
            />

            <EventDetailsSection
              eventInfo={eventInfo}
              galleryPhotos={galleryPhotos}
            />

            <OrganizationsSection
              organizations={organizations}
              onSelectOrg={(org) => setSelectedOrg(org)}
              onOpenAdmin={handleOpenAdmin}
            />

            <VideoSection
              eventInfo={eventInfo}
            />

            <ReadyJoinSection
              eventInfo={eventInfo}
              onOpenAdventure={() => setIsAdventureModalOpen(true)}
            />
          </main>

          <Footer onOpenAdmin={handleOpenAdmin} />
        </div>
      )}

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <FoxAdventureModal
        isOpen={isAdventureModalOpen}
        onClose={() => setIsAdventureModalOpen(false)}
        organizations={organizations}
        onRegister={handleRegisterStudent}
      />

      <OrgDetailsModal
        org={selectedOrg}
        onClose={() => setSelectedOrg(null)}
        onJoinClick={(orgName) => {
          setSelectedOrg(null);
          setIsAdventureModalOpen(true);
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        onSubmitInquiry={handleSubmitInquiry}
      />
    </div>
  );
}
